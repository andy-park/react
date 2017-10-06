const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

const util = require('util');
const inspect = (object, depth = 1) => console.log(util.inspect(object, { colors: true, depth }));

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function broadcastUserCount() {
  const userCount = { users: wss.clients.size, type: 'count' }
  wss.broadcast(userCount);
};

// Broadcast message
wss.broadcast = function broadcast(data) {
  const input = JSON.stringify(data)
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(input);
    }
  })
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  broadcastUserCount();

  ws.on('message', data => {
    var message = JSON.parse(data);

    switch(message.type) {
      case 'nameChange':
        message = {
          type: 'systemMessage',
          content: `${message.oldName} changed their name to ${message.newName}`
        };
        break;
    }

    message.id = uuidv4();

    wss.broadcast(message);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastUserCount();
  });
});