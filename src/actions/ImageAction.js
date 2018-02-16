import Dispatcher from '../Dispatcher'
import ImageActionTypes from './ImageActionTypes';

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
    }
}

export default ImageAction;