import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import AppActionTypes from '../actions/AppActionTypes';

class AppStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
            activeTabKey: 1
        };
    }

    reduce(state, action) {
        switch (action.type) {
            case AppActionTypes.CHANGE_TAB:
                state.activeTabKey = action.activateKey;
            default:
                return state;
            return Object.assign({},state);
        }
    }
}

export default new AppStore();