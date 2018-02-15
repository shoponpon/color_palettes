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
    }
}

export default ImageAction;