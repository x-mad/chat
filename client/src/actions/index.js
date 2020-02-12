export const INIT_WEBSOCKET = 'INIT_WEBSOCKET';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECIEVE_MESSAGES = 'RECIEVE_MESSAGES';
export const WS_ACTIVE = 'WS_ACTIVE';
export const LOAD_ROOMS = 'LOAD_ROOMS';
export const ACTIVE_ROOM = 'ACTIVE_ROOM';
export const LOAD_HISTORY = 'LOAD_HISTORY';


export const initWebsocket = () => {
    return {
        type: INIT_WEBSOCKET
    }
};

export const sendMessage = (message) => {
    return {
        type: SEND_MESSAGE,
        payload: message
    }
};

export const recieveMessages = (messages) => {
    return {
        type: RECIEVE_MESSAGES,
        payload: messages
    }
};

export const changeWebsocketStatus = (status) => {
    return {
        type: WS_ACTIVE,
        payload: status
    }
};

export const loadRooms = (rooms) => {
    return {
        type: LOAD_ROOMS,
        payload: rooms
    }
};

export const setActiveRoom = (room) => {
    return {
        type: ACTIVE_ROOM,
        payload: room
    }
};

export const loadHistory = (room) => {
    return {
        type: LOAD_HISTORY,
        payload: room
    }
};
