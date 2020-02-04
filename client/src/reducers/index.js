import {combineReducers} from 'redux';
import {RECIEVE_MESSAGES, WS_ACTIVE} from '../actions';

const messagesReducer = (state = null, action) => {     // state = null - to avoid message 'no any messages yet' at startup
    switch (action.type) {
        case RECIEVE_MESSAGES :
            state = state || [];
            return [...state, ...action.payload];
        default :
            return state;
    }
};

const connectionReducer = (state = null, action) => {
    switch (action.type) {
        case WS_ACTIVE:
            return action.payload;
        default :
            return state;
    }
};

export default combineReducers({
    messages : messagesReducer,
    connection: connectionReducer
});