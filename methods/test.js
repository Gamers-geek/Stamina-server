const { Server, WebSocket } = require('ws')

module.exports = {
    name: "test",
    description: "Ceci est une methode de demonstration qui cherche l'id dun message pour renvoyer le message",
    run: function(message, client) {
        let data = message.data;

        // On défini les messages
        let messages = {
            messageTest: "Ceci est un message de test du tonnerre :)"
        };
        // On récupère le message par rapport à l'ID envoyé dans la requête
        if (data.messageID && messages[data.messageID]) {
            client.send(JSON.stringify({
                method: "test",
                data: {
                    message: messages[data.messageID],
                    date: new Date()
                }
            }));
        } else

        client.send(Buffer.from(JSON.stringify({
            method: "test",
            error: 'message not found' // on renvoie une erreur
        }),
        "utf-8"
        ));
    }
}