import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import AppActionTypes from '../actions/AppActionTypes';
import ImageActionTypes from '../actions/ImageActionTypes';

class AppStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            activeTabKey: 1,
            submitButtonState: true,
            validationErrorMessage: undefined,
            openedColorpicker: -1
        };
    }

    reduce(state, action) {
        switch (action.type) {
            case AppActionTypes.CHANGE_TAB:
                state.activeTabKey = action.activateKey;
                break;
            case AppActionTypes.CHANGE_SUBMIT_BUTTON_STATE:
                state.submitButtonState = action.submitButtonState;
                break;
            case AppActionTypes.SHOW_VALIDATION_ERROR:
                state.validationErrorMessage = action.message;
                break;
            case ImageActionTypes.SELECT_IMAGE_FILE:
                state.validationErrorMessage = undefined;
                break;
            case AppActionTypes.OPEN_COLOR_PICKER:
                state.openedColorpicker = action.openedColorpicker
                break;
            case AppActionTypes.CLOSE_COLOR_PICKER:
                state.openedColorpicker = -1;
                break;
            default:
                break;
        }
        return Object.assign({},state);
    }
}

export default new AppStore();