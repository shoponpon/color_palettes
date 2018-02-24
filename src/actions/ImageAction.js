import Dispatcher from '../Dispatcher';
import ImageActionTypes from './ImageActionTypes';
import axios from 'axios';
import appAction from './AppAction';

const ENDPOINT = "https://p8vscrn97b.execute-api.us-east-2.amazonaws.com/prod/lambda_image_to_dot";

const ImageAction = {
    selectImageFile(file) {
        if (file) {
            if (file.size <= 4000000) {
                appAction.changeTab(1);
                const reader = new FileReader();
                reader.onload = function (e) {
                    Dispatcher.dispatch({
                        type: ImageActionTypes.SELECT_IMAGE_FILE,
                        inputImage: e.target.result
                    });
                }
                reader.readAsDataURL(file);
            }else{
                appAction.showValidationError('選択されたファイルが4MBを超えています。');
            }
        }
    },

    selectDotNumber(numberString) {
        Dispatcher.dispatch({
            type: ImageActionTypes.SELECT_DOT_NUMBER,
            dotNumber: parseInt(numberString)
        });
    },

    checkSmoothing(value) {
        Dispatcher.dispatch({
            type: ImageActionTypes.CHECK_SMOOTHING
        });
    },

    selectPaletteColor(color, pickerId) {
        Dispatcher.dispatch({
            type: ImageActionTypes.SELECT_PALETTE_COLOR,
            id: pickerId,
            color: "#" + ("00" + color.r.toString(16)).slice(-2) + ("00" + color.g.toString(16)).slice(-2) + ("00" + color.b.toString(16)).slice(-2)
        });
    },

    selectPaletteColorFromUrl(color, pickerId) {
        Dispatcher.dispatch({
            type: ImageActionTypes.SELECT_PALETTE_COLOR,
            id: pickerId,
            color: "#" + color
        });
    },

    setPaletteColors(colors) {
        Dispatcher.dispatch({
            type: ImageActionTypes.SET_PALETTE_COLORS,
            palette: colors.concat()
        });
    },

    addPaletteColor() {
        Dispatcher.dispatch({
            type: ImageActionTypes.ADD_PALETTE_COLOR
        });
    },

    removePaletteColor() {
        Dispatcher.dispatch({
            type: ImageActionTypes.REMOVE_PALETTE_COLOR
        });
    },

    setRandomColors() {
        let colors = [];
        for(let i = 0;i<8;i++){
            colors.push("#"+("00"+parseInt(Math.random()*256).toString(16)).slice(-2)+("00"+parseInt(Math.random()*256).toString(16)).slice(-2)+("00"+parseInt(Math.random()*256).toString(16)).slice(-2))
        }
        Dispatcher.dispatch({
            type: ImageActionTypes.SET_RANDOM_COLORS,
            colors: colors
        });
    },

    setGradationColors(startColor, endColor, colorNum) {

        let colors = [startColor];
        colorNum -= 2;

        console.log(startColor)

        console.log({
            r:parseInt(startColor.slice(1,3),16),
            g:parseInt(startColor.slice(3,5),16),
            b:parseInt(startColor.slice(5,7),16)
        })

        const startColorRGB = {
            r:parseInt(startColor.slice(1,3),16),
            g:parseInt(startColor.slice(3,5),16),
            b:parseInt(startColor.slice(5,7),16)
        };
        const endColorRGB = {
            r:parseInt(endColor.slice(1,3),16),
            g:parseInt(endColor.slice(3,5),16),
            b:parseInt(endColor.slice(5,7),16)
        };

        const intervalR = Math.floor(Math.abs(startColorRGB.r - endColorRGB.r)/colorNum);
        const intervalG = Math.floor(Math.abs(startColorRGB.g - endColorRGB.g)/colorNum);
        const intervalB = Math.floor(Math.abs(startColorRGB.b - endColorRGB.b)/colorNum);

        for(let i = 1;i<=colorNum;i++){
            let r,g,b;
            if(startColorRGB.r<endColorRGB.r){
                r = startColorRGB.r + intervalR*i;
            }else{
                r = startColorRGB.r - intervalR*i;
            }
            if(startColorRGB.g<endColorRGB.g){
                g = startColorRGB.g + intervalG*i;
            }else{
                g = startColorRGB.g - intervalG*i;
            }
            if(startColorRGB.b<endColorRGB.b){
                b = startColorRGB.b + intervalB*i;
            }else{
                b = startColorRGB.b - intervalB*i;
            }
            colors.push("#"+("00"+r.toString(16)).slice(-2)+("00"+g.toString(16)).slice(-2)+("00"+b.toString(16)).slice(-2))
        }

        colors.push(endColor);

        console.log(colors);

        Dispatcher.dispatch({
            type: ImageActionTypes.SET_GRADATION_COLORS,
            colors: colors
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

    fetchDotImage(binaryImage, dotNumber, colors, smoothing) {
        //to mini size
        if (typeof binaryImage === 'undefined' || binaryImage === './image-select.png') {
            //console.log('A file is undefined.');
            return;
        }

        this._loadBinaryImage(binaryImage).then((image) => {
            //1000px以下に
            const moreBig = image.width > image.height ? image.width : image.height;
            if (moreBig > 1000) {
                const bias = 1000 / moreBig;
                const canvas = document.createElement('canvas');
                canvas.width = image.width * bias;
                canvas.height = image.height * bias;
                const ctx = canvas.getContext('2d');
                ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                this._postEndpoint(canvas.toDataURL('jpg'), dotNumber, colors, smoothing);
            } else {
                this._postEndpoint(binaryImage, dotNumber, colors, smoothing);
            }
        });
    },

    _postEndpoint(image, dotNumber, colors, smoothing) {
        appAction.changeTab(2);
        this.showLoading();
        appAction.changeSubmitButtonState(false);
        axios.post(ENDPOINT, {
            "binary": image,
            "colors": colors,
            "mosaic_num": dotNumber,
            "smoothing": smoothing
        }).then((response) => {
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

    showLoading() {
        Dispatcher.dispatch({
            type: ImageActionTypes.SHOW_LOADING
        });
    }
}

export default ImageAction;