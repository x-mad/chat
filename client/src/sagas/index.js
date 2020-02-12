import {takeEvery, put, call, take, select} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import * as ActionCreator from '../actions';

const API_URL = "ws://localhost:8081";

let socket,
    activeRoom;

function* initWebsocketChannel() {
    const channel = yield call(createEventChannel);

    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function* getActiveRoom () {
    const room = yield select(state => state.activeRoom);
    return room;
}

function createEventChannel() {
    return eventChannel(emit => {
        function createWebsocket() {
            socket = new WebSocket(API_URL);

            socket.onopen = () => {
                activeRoom ?
                    sendMessage(ActionCreator.setActiveRoom(activeRoom)) :
                    sendMessage(ActionCreator.loadRooms());

                emit(ActionCreator.changeWebsocketStatus(true));
            };

            socket.onclose = () => {
                emit(ActionCreator.changeWebsocketStatus(false));
                setTimeout(() => {createWebsocket()}, 2000);
            };

            socket.onmessage = e => {
                emit(JSON.parse(e.data));
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
    const room = yield getActiveRoom();
    yield call(sendMessage, {...action, room});
}

function* handleSetActiveRoom(action) {
    activeRoom = action.payload;
    yield call(sendMessage, action);
    yield call(sendMessage, ActionCreator.loadHistory(action.payload))
}

function* handleWebsocketConnection (){
    yield takeEvery(ActionCreator.INIT_WEBSOCKET, initWebsocketChannel);
    yield takeEvery(ActionCreator.ACTIVE_ROOM, handleSetActiveRoom);
    yield takeEvery(ActionCreator.SEND_MESSAGE, handleSendMessage);
}

export default function* rootSaga() {
    yield handleWebsocketConnection()
}