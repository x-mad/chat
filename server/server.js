const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8081});

const chatRooms = ['blue', 'yellow'];
const history = {};
const room = 'blue';
const historyLatestMsgCount = 10;

chatRooms.forEach( function (room) {
    history[room] = [];
});

function sendMessage (client, messages) {
    const messagesBatch = Array.isArray(messages) ? messages : [messages];

    if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messagesBatch));
    }
}

function broadcastMessage(clients, message) {
    clients.forEach(function each(client) {
        sendMessage(client, message);
    });

}

server.on('connection', function connection(ws) {

    ws.on('message', function incoming(data) {
        let message = JSON.parse(data);
        let {type} = message;

        message.time = Date.now();
        delete message.type;

        switch (type) {
            case 'LOAD_HISTORY':
                sendMessage(ws, history[room].slice(-historyLatestMsgCount));
                break;

            case 'SEND_MESSAGE':
                history[room].push(message);

                broadcastMessage(server.clients, message);
                break;
        }
    });
});

console.log('server started');


