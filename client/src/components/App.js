import React, {Component} from 'react';
import MessagesList from './MessagesList';
import InputBar from './InputBar';
import {connect} from 'react-redux';
import {initWebsocket, changeWebsocketStatus} from '../actions';

class App extends Component{
    render () {
        const {connection} = this.props;
        const maybeConnectionErrorOverlay = (connection == null || connection) ? '' :
            <div className="connection-lost">Connection was lost. Please wait.</div>;

        return (
            <div className="app">
                {maybeConnectionErrorOverlay}
                <MessagesList/>
                <InputBar/>
            </div>
        )
    }

    componentDidMount () {
        this.props.initWebsocket();
    }

    
}

function mapStateToProps ({connection}) {
    return {connection};
}

export default connect(mapStateToProps, {initWebsocket, changeWebsocketStatus})(App);