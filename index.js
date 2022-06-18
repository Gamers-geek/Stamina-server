const { Server, WebSocket } = require("ws");
const { port, debug } = require("./config");
const { debuging } = require('./utils/debug')
const server = new Server({ port: port });

server.on("connection", client => {
    client.on("message", message => {
        try {
            handleOnMessageReceive(message)
        } catch (error) {
            console.log(error);
        };
    });
    client.on("close", (code, reason) => {
        console.log(code, reason);
    });
    client.send(JSON.stringify({ "test": "test" }));
});

/**
 * @param {JSON} message 
 * @param {WebSocket} socket 
 * @returns {void}
 */
async function handleOnMessageReceive(message, socket) {
    const parsedMessage = JSON.parse(message);
    if (!parsedMessage) {
        return console.error("[ERROR] Invalid message format", message);
    };

    if (debug) {
        debuging("[DEBUG] Received message", parsedMessage);
    }

    return;
};