const { Server, WebSocket } = require ('ws')
const { info } = require("../config.js")

module.exports = {
    name: "version",
    description: "Description de la méthode",
    run:function(message, client) {
        let data = message.data;
        if (data.version == info.version) {
            client.send(Buffer.from(JSON.stringify({
                "version": {
                    "isUpdate": true,
                    "version": version
                }
            }), "utf-8"
            ));
        } else if (data.version > info.version) {
            client.send(Buffer.from(JSON.stringify({
                "version": {
                    "isUpdate": false,
                    "version": info.version
                }
            }), "utf-8"
            ))
        }
    }
}