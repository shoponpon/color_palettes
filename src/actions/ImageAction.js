import Dispatcher from '../Dispatcher';
import ImageActionTypes from './ImageActionTypes';
import axios from 'axios';
import appAction from './AppAction';

const ENDPOINT = "https://p8vscrn97b.execute-api.us-east-2.amazonaws.com/prod/lambda_image_to_dot";

const ImageAction = {
    selectImageFile(file) {
        appAction.changeTab(1);
        const reader = new FileReader();
        reader.onload = function (e) {
            Dispatcher.dispatch({
                type: ImageActionTypes.SELECT_IMAGE_FILE,
                inputImage: e.target.result
            });
        }
        reader.readAsDataURL(file);
    },

    selectDotNumber(numberString) {
        Dispatcher.dispatch({
            type: ImageActionTypes.SELECT_DOT_NUMBER,
            dotNumber: parseInt(numberString)
        });
    },

    selectPaletteColor(color, pickerId) {
        Dispatcher.dispatch({
            type: ImageActionTypes.SELECT_PALETTE_COLOR,
            id: pickerId,
            color: "#"+("00"+color.r.toString(16)).slice(-2)+("00"+color.g.toString(16)).slice(-2)+("00"+color.b.toString(16)).slice(-2)
        });
    },

    selectPaletteColorFromUrl(color,pickerId){
        Dispatcher.dispatch({
            type:ImageActionTypes.SELECT_PALETTE_COLOR,
            id: pickerId,
            color: "#"+color
        });
    },

    setPaletteColors(colors) {
        Dispatcher.dispatch({
            type: ImageActionTypes.SET_PALETTE_COLORS,
            palette: colors.concat()
        });
    },

    fetchColorPalettes() {
        //fetch
        axios.post(ENDPOINT, {
            'binary': null
        }).then(function (response) {
            let palettes = response.data.palettes;
            Dispatcher.dispatch({
                type: ImageActionTypes.SET_COLOR_PALETTES,
                palettes: palettes
            });
        }).catch(function (error) {
            console.log(error);
        });
    },

    fetchDotImage(binaryImage, dotNumber, colors) {
        //to mini size
        if (typeof binaryImage === 'undefined') {
            //console.log('A file is undefined.');
            return;
        }

        this._loadBinaryImage(binaryImage).then((image) => {
            //800以下に
            const moreBig = image.width > image.height ? image.width : image.height;
            if (moreBig > 800) {
                const bias = 800 / moreBig;
                const canvas = document.createElement('canvas');
                canvas.width = image.width * bias;
                canvas.height = image.height * bias;
                const ctx = canvas.getContext('2d');
                ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                this._postEndpoint(canvas.toDataURL('jpg'), dotNumber, colors);
            } else {
                this._postEndpoint(binaryImage, dotNumber, colors);
            }
        });
    },

    _postEndpoint(image, dotNumber, colors) {
        appAction.changeTab(2);
        this.showLoading();
        //console.log(colors);
        /*console.log({
            "binary": image,
            "color1":colors[0],
            "color2":colors[1],
            "color3":colors[2],
            "color4":colors[3],
            "mosaic_num": dotNumber
        });*/
        appAction.changeSubmitButtonState(false);
        axios.post(ENDPOINT, {
            "binary": image,
            "color1": colors[0],
            "color2": colors[1],
            "color3": colors[2],
            "color4": colors[3],
            "mosaic_num": dotNumber,
            "smoothing": 1
        }).then((response) => {
            console.log(response.data)
            Dispatcher.dispatch({
                type: ImageActionTypes.SET_DOT_IMAGE,
                outputImage: response.data.binary,
                palettes: response.data.palettes
            });
            appAction.changeSubmitButtonState(true);
        }).catch(function (error) {
            console.log(error);
            appAction.changeSubmitButtonState(true);
        });
    },

    _loadBinaryImage(binary) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.src = binary;
        });
    },

    showLoading(){
        Dispatcher.dispatch({
            type: ImageActionTypes.SHOW_LOADING
        });
    }
}

export default ImageAction;