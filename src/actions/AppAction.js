import AppActionTypes from './AppActionTypes';
import Dispatcher from '../Dispatcher';

const AppAction = {
    changeTab(key){
        Dispatcher.dispatch({
            type: AppActionTypes.CHANGE_TAB,
            activateKey: key
        });
    },
    changeSubmitButtonState(state){
        Dispatcher.dispatch({
            type: AppActionTypes.CHANGE_SUBMIT_BUTTON_STATE,
            submitButtonState: state
        });
    },
    showValidationError(message){
        Dispatcher.dispatch({
            type: AppActionTypes.SHOW_VALIDATION_ERROR,
            message: message
        });
    }
}

export default AppAction;