const { Server, WebSocket } = require("ws");

module.exports = {
	/**
	 * @name getgamesamount
	 * @description Renvoie le nombre de parties en cours.
	 * @function run
	 * @param {JSON} message
	 * @param {WebSocket} client
	 * @returns {String}
	 */
	name: "getgamesamount",
	description: "Renvoie le nombre de parties en cours.",
	run: function (message, client) {
		let data = message.data;
		let response = {
			amount_games: 5,
		};
		client.send(Buffer.from(JSON.stringify(response), "utf-8"));
	},
};
