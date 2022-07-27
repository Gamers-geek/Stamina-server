const { Server, WebSocket } = require ('ws')
const { version } = require("../config.js")

module.exports = {
    name: "version",
    description: "Permet de verifier la version du client.",
    run:function(message, client) {
        let data = message.data;
        if (data.version == version) {
            client.send(Buffer.from(JSON.stringify({
                "version": {
                    "isUpdate": true,
                    "version": version
                }
            }), "utf-8"
            ));
        } else if (data.version > version) {
            client.send(Buffer.from(JSON.stringify({
                "version": {
                    "isUpdate": false,
                    "version": version
                }
            }), "utf-8"
            ))
        }
    }
}