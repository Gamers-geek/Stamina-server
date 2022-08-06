const debug = require("../utils/debug.js");
const { Vector3 } = require("three");

module.exports = {
	/**
	 * @name ValidateUserPosition
	 * @description Permet de valider la prochaine position du joueur
	 * @function run
	 * @param {JSON} message
	 * @param {WebSocket} client
	 * @returns {void}
	 */
	name: "ValidateUserPosition",
	description: "Permet de valider la prochaine position du joueur",
	run: function (message, client) {
		let data = message.data;
		let id = message.requestId;
		var Userposition = new Vector3();
		Userposition = data.position;
	},
};
