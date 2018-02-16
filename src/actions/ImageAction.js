import Dispatcher from '../Dispatcher'
import ImageActionTypes from './ImageActionTypes';
import axios from 'axios';

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

    selectDotNumber(number){
        Dispatcher.dispatch({
            type: ImageActionTypes.SELECT_DOT_NUMBER,
            dotNumber: number
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
            console.log(response.data);
            Dispatcher.dispatch({
                type: ImageActionTypes.SET_COLOR_PALETTES,
                palettes: palettes
            });
            console.log(response);
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
                ctx.drawImage(image,0,0,canvas.width,canvas.height);
                this._loadBinaryImage(canvas.toDataURL('jpg')).then((fixed_image)=>{
                    this._postEndpoint(fixed_image,dotNumber,colors);
                });
            }else{
                this._postEndpoint(image,dotNumber,colors);
            }
        });
    },

    _postEndpoint(image,dotNumber,colors){
        axios.post(ENDPOINT,{
            "binary": this._resizeImage(image,image.width/dotNumber,image.height/dotNumber),
            "color1": this._rbgCssToCode(colors[0]),
            "color2": this._rbgCssToCode(colors[1]),
            "color3": this._rbgCssToCode(colors[2]),
            "color4": this._rbgCssToCode(colors[3])
        }).then((response)=>{
            this._loadBinaryImage(response.data.binary).then((image)=>{
                Dispatcher.dispatch({
                    type: ImageActionTypes.SET_DOT_IMAGE,
                    outputImage: this._resizeImage(image,image.width*dotNumber,image.height*dotNumber)
                });
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

    _resizeImage(image,width,height){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image,0,0,width,height);
        console.log(canvas.width,canvas.height);
        return canvas.toDataURL('png');
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