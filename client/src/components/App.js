import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initWebsocket, changeWebsocketStatus} from '../actions';
import MessagesList from './MessagesList';
import InputBar from './InputBar';
import RoomSelector from './RoomSelector';


class App extends Component{
    render() {
        const {connection, activeRoom} = this.props;
        let additionalContent = '';

        if (connection === false) {
            additionalContent = this.renderOverlay('Connection was lost. Please wait.');
        } else if (connection && !activeRoom) {
            additionalContent = this.renderRoomSelector();
        }

        return (
            <div className="app">
                {additionalContent}
                <MessagesList/>
                <InputBar/>
            </div>
        )
    }


    componentDidMount () {
        this.props.initWebsocket();
    }

    renderRoomSelector () {
        return (
            <div>
                {this.renderOverlay()}
                <RoomSelector/>
            </div>
        )
    }

    renderOverlay (text) {
        return (
            <div className="overlay">{text}</div>
        )
    }
}

function mapStateToProps ({connection, activeRoom}) {
    return {connection, activeRoom};
}

export default connect(mapStateToProps, {initWebsocket, changeWebsocketStatus})(App);