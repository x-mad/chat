import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setActiveRoom} from '../actions';

class RoomSelector extends Component {
    render() {
        return (
            <div className="room-selector">
                <h3>Select room</h3>
                {this.renderRooms()}
            </div>
        )
    }

    renderRooms () {
        const {rooms} = this.props;

        if (!rooms) 
            return 'Loading rooms...';

        return Object.keys(rooms).map( room => {
            return <div className="room-selector__room" key={room} onClick={this.onRoomSelect.bind(this, room)}>{room}</div>
        });
    }

    onRoomSelect(room) {
        this.props.setActiveRoom(room);
    }
}


function masStateToProps({rooms}) {
    return {rooms};    
}

export default connect (masStateToProps, {setActiveRoom})(RoomSelector);