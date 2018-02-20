import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import AppActionTypes from '../actions/AppActionTypes';

class AppStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            activeTabKey: 1,
            submitButtonState: true
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
            default:
                break;
        }
        return Object.assign({},state);
    }
}

export default new AppStore();