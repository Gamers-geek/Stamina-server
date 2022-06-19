module.exports = {
    name: "test",
    description: "Ceci est une methode de demonstration qui cherche l'id dun message pour renvoyé le message",
    run: function (message, socket, client) {
        let data = message.data;
        let messages = {
            messageTest: "Ceci est un message de test du tonére :)"
        }

        if (data.messageID && messages[data.messageID]) {
            client.send(JSON.stringify({
                method: "test",
                data: {
                    message: messages[data.messageID],
                    date: new Date()
                    // Tu peut aussi recup des info dans une DB ect...
                }

            }))
        } else client.send(JSON.stringify({
            method: "test",
            error: 'message not found'
        }))
    }
}