import Dispatcher from '../Dispatcher'
import ImageActionTypes from './ImageActionTypes';
import axios from 'axios';

const ENDPOINT = "";

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
        axios.get(ENDPOINT).then(function(response){
/*            if(response.data){                
            }
            let palettes = [];
            Dispatcher.dispatch({
                type: ImageActionTypes.SET_COLOR_PALETTES,
                palettes: palettes
            });*/
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
    }
}

export default ImageAction;