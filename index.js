const { Server, WebSocket } = require("ws");
const { port, debug } = require("./config");
const debuging = require("./utils/debug")
const server = new Server({ port: port });

server.on("connection", client => {
    console.log("Une personne vient de se connecter")
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
function handleOnMessageReceive(message, socket) {
    let hehe = message.toString()
    let parsedMessage = JSON.parse(hehe);
    if (!parsedMessage) {
        return console.error("[ERROR] Invalid message format", message);
    };

    if (debug) {
        debuging(parsedMessage);
    }

    return;
};