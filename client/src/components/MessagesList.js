import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class MessagesList extends Component {
    render () {
        const {messages, connection} = this.props;
        let content;

        if (messages) {
            if (messages.length) {
                content = this.renderMessages();
            } else if (connection){
                content = <div className="empty-list-msg">No any messages yet</div>;
            }
        } else {
            content = <div className="empty-list-msg">Loading...</div>;
        }

        return (
            <div className="message-list" ref="messageList">
                {content}
            </div>
        )
    }

    renderMessages () {
        return _.map(this.props.messages, message => {
                return (
                    <div className="message" key={message.time}>
                        <div className="message-nickname">{message.nickname}</div>
                        <div className="message-text">{message.text}</div>
                    </div>
                )
            })
    }

    componentDidUpdate () {
        const {messageList} = this.refs;

        messageList.scrollTo({
            top: messageList.scrollHeight,
            behavior: 'smooth'
        });
    }
}

function mapStateToProps ({messages, connection}) {
    return {messages, connection};
}

export default connect(mapStateToProps)(MessagesList);