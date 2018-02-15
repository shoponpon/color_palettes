import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ImageActionTypes from '../actions/ImageActionTypes';

class ImageStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            inputImage: undefined
        };
    }

    reduce(state, action) {
        switch (action.type) {
            case ImageActionTypes.SELECT_IMAGE_FILE:
                state.inputImage = action.inputImage;
                break;
            default:
                break;
        }
        return Object.assign({},state);
    }
}

export default new ImageStore();