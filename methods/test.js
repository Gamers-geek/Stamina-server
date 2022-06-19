const { Server, WebSocket } = require('ws')

module.exports = {
    /**
     * @function run
     * @param {JSON} message
     * @param {Server<WebSocket>} socket
     * @param {WebSocket} client
     * @returns {JSON}
     */
    name: "test",
    description: "Ceci est une methode de demonstration qui cherche l'id dun message pour renvoyer le message",
    run: function (message, socket, client) {
        let data = message.data;

        // On défini les messages
        let messages = {
            messageTest: "Ceci est un message de test du tonnerre :)"
        }
        // On récupère le message par rapport à l'ID envoyé dans la requête
        if (data.messageID && messages[data.messageID]) {
            client.send(JSON.stringify({
                method: "test",
                data: {
                    message: messages[data.messageID],
                    date: new Date()
                }

            }))
        } else client.send(JSON.stringify({
            method: "test",             // Si le message n'existe pas,
            error: 'message not found'  // on renvoie une erreur
        }))
    }
}