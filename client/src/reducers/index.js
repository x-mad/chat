import {combineReducers} from 'redux';
import {RECIEVE_MESSAGES, WS_ACTIVE, LOAD_ROOMS, ACTIVE_ROOM} from '../actions';

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

const roomsReducer = (state = null, action) => {
    switch (action.type) {
        case LOAD_ROOMS:
            return {...action.payload};
        default:
            return state;
    }
};

const activeRoomReducer = (state = null, action) => {
    switch (action.type) {
        case ACTIVE_ROOM:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    messages : messagesReducer,
    connection: connectionReducer,
    rooms: roomsReducer,
    activeRoom: activeRoomReducer
});