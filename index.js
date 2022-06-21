const { Server, WebSocket, } = require("ws");
const { port } = require("./config");
const {debug, debugError} = require("./utils/debug")
const server = new Server({ port: port });
console.log(`Server started on port ${port} !`)

let methods = require("./handler.js")

server.on("connection", client => {
    debug("Une personne vient de se connecter")
    client.on("message", message => {
        try {
            handleOnMessageReceive(message, server, client)
        } catch (error) {
            debugError(error);
        };
    });
    client.on("close", (code, reason) => {
        debug(`Connexion closed with code: ${code}, raison: ${reason.toString() ? reason.toString() : "Aucune"}`);
    });
    client.send(JSON.stringify({ "test": "test" }));
});

/**
 * @param {JSON} message 
 * @param {Server<WebSocket>} socket
 * @param {WebSocket} client  
 * @returns {void}
 */
function handleOnMessageReceive(message, socket, client) {
    let hehe = message.toString()
    let parsedMessage = JSON.parse(hehe);
    if (!parsedMessage) {
        return console.error("[ERROR] Invalid message format", message);
    };

    debug(parsedMessage);
    
    if (parsedMessage.method) handleMethod(parsedMessage, socket, parsedMessage.method, client)

    return;
};

/**
 * @param {JSON} message 
 * @param {Server<WebSocket>} socket 
 * @param {String} method 
 * @param {WebSocket} client 
 * @returns {Function} 
 */
function handleMethod(message, socket, method, client) {
    // Si la méthode n'existe pas, on retourne une erreur
    if (!methods[method]) {
        
        debug(`Quelqu'un a voulu utiliser la fonction "${method}" qui n'existe pas.`)
        
        return client.send(JSON.stringify({
            error: 400
        }))

    }
    return methods[method].run(message, socket, client)
}