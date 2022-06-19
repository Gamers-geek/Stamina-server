const { Server, WebSocket } = require('ws')

module.exports = {
    /**
     * @function run
     * @param {JSON} message
     * @param {Server<WebSocket>} socket
     * @param {WebSocket} client
     * @returns {JSON}
     */
    name: "calc",
    description: "Ceci est une deuxieme methode de demonstration qui sert à calculer deux nombre (à rien en gros mdr)",
    run: function (message, socket, client) {
        let data = message.data;

        if (data.firstN && data.secondN) {
            if (typeof data.firstN === "number" && typeof data.secondN === "number") {
                client.send(JSON.stringify({
                    method: "calc",
                    data: {
                        result: data.firstN + data.secondN,
                        date: new Date()
                        // On peut aussi recup des info dans une DB ect...
                    }
                }))
            } else client.send(JSON.stringify({
                method: "calc",
                error: 'not valid number'
            }))

        } else client.send(JSON.stringify({
            method: "calc",
            error: 'not valid param'
        }))
    }
}