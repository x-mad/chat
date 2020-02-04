import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendMessage} from '../actions';

class InputBar extends Component {
    constructor (props) {
        super(props);

        this.state = {
            text: '',
            nickname: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onNicknameChange = this.onNicknameChange.bind(this);
    }

    render () {
        return (

            <form onSubmit={this.onSubmit} action="" className="input-group">
                <input type="text"
                       placeholder="Nickname"
                       className="input-nickname"
                       onChange={this.onNicknameChange}
                       value={this.state.nickname}
                />
                <input type="text"
                       placeholder="Message"
                       className="input-message"
                       onChange={this.onMessageChange}
                       value={this.state.text}
                />
                <button type="submit" className="btn-send">
                    Send
                </button>
            </form>
        )
    }

    onSubmit (e) {
        e.preventDefault();

        if (this.state.nickname && this.state.text) {
            this.props.sendMessage({...this.state});
            this.clearInput();
        }
    }

    clearInput() {
        this.setState({text:''});
    }

    onNicknameChange(e) {
        this.setState({
            nickname: e.target.value
        })
    }

    onMessageChange(e) {
        this.setState({
            text: e.target.value
        })
    }
}


export default connect(null, {sendMessage})(InputBar);