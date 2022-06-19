const { Server, WebSocket } = require("ws");
const { port, debug } = require("./config");
const debuging = require("./utils/debug")
const server = new Server({ port: port });

let methods = require("./handler.js")





server.on("connection", client => {
    console.log("Une personne vient de se connecter")
    client.on("message", message => {
        try {
            handleOnMessageReceive(message, server, client)
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
function handleOnMessageReceive(message, socket, client) {
    let hehe = message.toString()
    let parsedMessage = JSON.parse(hehe);
    if (!parsedMessage) {
        return console.error("[ERROR] Invalid message format", message);
    };

    if (debug) {
        debuging(parsedMessage);
    }
    if (parsedMessage.method) handleMethod(parsedMessage, socket, parsedMessage.method, client)

    return;
};

function handleMethod(message, socket, method, client) {
    
    if (!methods[method])  {
        if (debug) {
        debuging(`Quelqu'un à voulu utiliser la fonction "${method}" qui n'existe pas.`)
        }
        return client.send(JSON.stringify({
            error: 400
        })) // si la méthod n'existe pas, renvoyé le code 400
        
    }
     
    methods[method].run(message, socket, client)
}