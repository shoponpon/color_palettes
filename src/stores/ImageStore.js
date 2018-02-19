import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ImageActionTypes from '../actions/ImageActionTypes';
import ImageAction from '../actions/ImageAction';

class ImageStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            inputImage: undefined,
            outputImage: undefined,
            palette:['rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)'],
            palettes:[],
            dotNumber: 2
        };
    }

    reduce(state, action) {
        switch (action.type) {
            case ImageActionTypes.SELECT_IMAGE_FILE:
                state.inputImage = action.inputImage;
                break;
            case ImageActionTypes.COPY_PALETTES:
                state.palette = state.palettes[action.id];
                break;
            case ImageActionTypes.SELECT_DOT_NUMBER:
                state.dotNumber = action.dotNumber;
                break;
            case ImageActionTypes.SELECT_PALETTE_COLOR:
                state.palette[action.id] = action.color;
                console.log(action);
                break;
            case ImageActionTypes.SET_DOT_IMAGE:
                state.outputImage = action.outputImage;
                break;
            default:
                break;
        }
        return Object.assign({},state);
    }
}

export default new ImageStore();