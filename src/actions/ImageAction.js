import Dispatcher from '../Dispatcher'
import ImageActionTypes from './ImageActionTypes';
import axios from 'axios';
import appAction from './AppAction';

const ENDPOINT = "https://p8vscrn97b.execute-api.us-east-2.amazonaws.com/prod/lambda_image_to_dot";

const ImageAction = {
    selectImageFile(file){
        const reader = new FileReader();  
        reader.onload = function (e) {
            Dispatcher.dispatch({
                type: ImageActionTypes.SELECT_IMAGE_FILE,
                inputImage: e.target.result
            });
        }
        reader.readAsDataURL(file);
    },

    selectDotNumber(numberString){
        Dispatcher.dispatch({
            type: ImageActionTypes.SELECT_DOT_NUMBER,
            dotNumber: parseInt(numberString)
        });
    },

    selectPaletteColor(color,pickerId){
        Dispatcher.dispatch({
            type: ImageActionTypes.SELECT_PALETTE_COLOR,
            id: pickerId,
            color: "rgb("+color.r+","+color.g+","+color.b+")"
        });
    },

    copyColorPalettes(id){
        Dispatcher.dispatch({
            type: ImageActionTypes.COPY_PALETTES,
            id: id
        });
    },

    fetchColorPalettes(){
        //fetch
        axios.post(ENDPOINT,{
            'binary':null
        }).then(function(response){
            let palettes = response.data.palettes;
            Dispatcher.dispatch({
                type: ImageActionTypes.SET_COLOR_PALETTES,
                palettes: palettes
            });
        }).catch(function(error){
            console.log(error);
        });
    },

    fetchDotImage(binaryImage,dotNumber,colors){
        //to mini size
        if(typeof binaryImage == 'undefined'){
            console.log('A file is undefined.');
            return;
        }

        this._loadBinaryImage(binaryImage).then((image)=>{
            //800以下に
            const moreBig = image.width > image.height ? image.width : image.height;
            if(moreBig > 800){
                const bias = 800 / moreBig;
                const canvas = document.createElement('canvas');
                canvas.width = image.width * bias;
                canvas.height = image.height * bias;
                const ctx = canvas.getContext('2d');
                ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(image,0,0,canvas.width,canvas.height);
                this._postEndpoint(canvas.toDataURL('jpg'),dotNumber,colors);
            }else{
                this._postEndpoint(binaryImage,dotNumber,colors);
            }
        });
    },

    _postEndpoint(image,dotNumber,colors){
        appAction.changeTab(2);
        axios.post(ENDPOINT,{
            "binary": image,
            "color1": this._rbgCssToCode(colors[0]),
            "color2": this._rbgCssToCode(colors[1]),
            "color3": this._rbgCssToCode(colors[2]),
            "color4": this._rbgCssToCode(colors[3]),
            "mosaic_num": dotNumber
        }).then((response)=>{
            console.log(response);
            Dispatcher.dispatch({
                type: ImageActionTypes.SET_DOT_IMAGE,
                outputImage: response.data.binary
            });
        }).catch(function(error){
            console.log(error);
        });  
    },

    _loadBinaryImage(binary){
        return new Promise((resolve,reject)=>{
            let image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.src = binary;
        });
    },

    _rbgCssToCode(css){
        const rgb = css.slice(4).slice(0,-1).split(",");
        const dec2hex = (dec) => {
            const len = parseInt(dec).toString(16).length;
            return len != 2 ? "0"+parseInt(dec).toString(16) : parseInt(dec).toString(16);
        };
        return "#"+dec2hex(rgb[0])+dec2hex(rgb[1])+dec2hex(rgb[2]);
    }
}

export default ImageAction;