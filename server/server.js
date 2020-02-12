const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8081});

const chatRooms = {
    blue: {
        history: [],
        clients: []
    },
    yellow: {
        history: [],
        clients: []
    }
};

const historyLatestMsgCount = 10;

function sendMessage (client, messages) {
    if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messages));
    }
}

function broadcastMessage(clients, messages) {
    clients.forEach(function each(client) {
        sendMessage(client, messages);
    });
}

server.on('connection', function connection(ws) {

    ws.on('message', function incoming(actionStr) {
        let action = JSON.parse(actionStr);
        let room;
        let message;

        switch (action.type) {
            case 'ACTIVE_ROOM' :
                room = action.payload;
                chatRooms[room].clients.push(ws);
                break;
            
            case 'LOAD_HISTORY':
                room = action.payload;

                sendMessage(ws, {
                    type    : 'RECIEVE_MESSAGES',
                    payload : chatRooms[room].history.slice(-historyLatestMsgCount)
                });
                
                break;

            case 'LOAD_ROOMS' :
                sendMessage(ws, {...action, payload: chatRooms});
                break;
            
            case 'SEND_MESSAGE':
                room = action.room;
                message = {...action.payload, time: Date.now()};

                chatRooms[room].history.push(message);

                broadcastMessage(chatRooms[room].clients, {
                    type    : 'RECIEVE_MESSAGES',
                    payload : [message]
                });
                break;
        }
    });
});

console.log('server started');


