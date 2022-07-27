const { Server, WebSocket } = require ('ws')

module.exports = {
    name : "getgamesamount",
    description : "Description de la méthode",
    run : function(message, client) {
        let data = message.data;
        let response = {
            "amount_games": 5
        };
        client.send(Buffer.from(JSON.stringify(response), "utf-8"));
    }
}