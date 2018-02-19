import AppActionTypes from './AppActionTypes';
import Dispatcher from '../Dispatcher';

const AppAction = {
    changeTab(key){
        Dispatcher.dispatch({
            type: AppActionTypes.CHANGE_TAB,
            activateKey: key
        });
    }
}

export default AppAction;