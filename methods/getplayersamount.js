const { Server, WebSocket } = require("ws");

module.exports = {
	/**
	 * @name getplayersamount
	 * @description Renvoie le nombre de joueurs connectés.
	 * @function run
	 * @param {JSON} message
	 * @param {WebSocket} client
	 * @returns {String}
	 */
	name: "getplayersamount",
	description: "Renvoie le nombre joueurs connectés.",
	run: function (message, client) {
		let data = message.data;
		let response = {
			amount_players: 50,
		};
		let strresponse = JSON.stringify(response);
		client.send(Buffer.from(strresponse), "utf-8");
	},
};
