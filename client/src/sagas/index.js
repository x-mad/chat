import {takeEvery, put, call, take, fork} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {INIT_WEBSOCKET, SEND_MESSAGE, recieveMessages, changeWebsocketStatus} from '../actions';

const API_URL = "ws://localhost:8081";

let socket;

function* initWebsocketChannel() {
    const channel = yield call(createEventChannel);

    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function createEventChannel() {
    return eventChannel(emit => {
        function createWebsocket() {
            socket = new WebSocket(API_URL);

            socket.onopen = () => {
                sendMessage({type: 'LOAD_HISTORY'});
                emit(changeWebsocketStatus(true));
            };

            socket.onclose = () => {
                emit(changeWebsocketStatus(false));
                setTimeout(() => {createWebsocket()}, 2000);
            };

            socket.onmessage = e => {
                emit(recieveMessages(JSON.parse(e.data)));
            };
        }
        
        createWebsocket();
        
        return () => {
            socket.close();
        }
    });
}

function sendMessage (jsonData) {
    socket.send(JSON.stringify(jsonData));
}

function* handleSendMessage (action) {
    yield call(sendMessage, action.payload)
}

function* handleWebsocketConnection (){
    yield takeEvery(INIT_WEBSOCKET, initWebsocketChannel);
    yield takeEvery(SEND_MESSAGE, handleSendMessage);
}

export default function* rootSaga() {
    yield handleWebsocketConnection()
}