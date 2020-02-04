export const INIT_WEBSOCKET = 'INIT_WEBSOCKET';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECIEVE_MESSAGES = 'RECIEVE_MESSAGES';
export const WS_ACTIVE = 'WS_ACTIVE';

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