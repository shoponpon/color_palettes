import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ImageActionTypes from '../actions/ImageActionTypes';

class ImageStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            inputImage: undefined,
            outputImage: undefined,
            palette:['#ffd54f','#3f51b5','#e1bee7','#c8e6c9'],
            palettes:[],
            dotNumber: 2,
            smoothing: 0
        };
    }

    reduce(state, action) {
        switch (action.type) {
            case ImageActionTypes.SELECT_IMAGE_FILE:
                state.inputImage = action.inputImage;
                state.outputImage = undefined;
                break;
            case ImageActionTypes.SELECT_DOT_NUMBER:
                state.dotNumber = action.dotNumber;
                break;
            case ImageActionTypes.CHECK_SMOOTHING:                
                state.smoothing = state.smoothing == 0 ? 1 : 0;
            case ImageActionTypes.SELECT_PALETTE_COLOR:
                state.palette[action.id] = action.color;
                break;
            case ImageActionTypes.SET_COLOR_PALETTES:
                state.palettes = action.palettes;
                break;
            case ImageActionTypes.SET_PALETTE_COLORS:
                state.palette = action.palette;
                break;
            case ImageActionTypes.ADD_PALETTE_COLOR:
                if(state.palette.length<8)state.palette.push(['#000000']);
                break;
            case ImageActionTypes.REMOVE_PALETTE_COLOR:
                if(state.palette.length>4)state.palette = state.palette.slice(0,-1);
                break;
            case ImageActionTypes.SET_RANDOM_COLORS:
                state.palette = action.colors.slice(0,state.palette.length);
                break;
            case ImageActionTypes.SET_DOT_IMAGE:
                state.outputImage = action.outputImage;
                state.palettes = action.palettes;
                break;
            case ImageActionTypes.SHOW_LOADING:
                state.outputImage = "http://colorpalette-converter.s3-website.us-east-2.amazonaws.com/henkanchu.png";
                break;
            default:
                break;
        }
        return Object.assign({},state);
    }
}

export default new ImageStore();