import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';

class AppStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return {
        };
    }

    reduce(state, action) {
        switch (action.type) {
            default:
                return state;
        }
    }
}

export default new AppStore();