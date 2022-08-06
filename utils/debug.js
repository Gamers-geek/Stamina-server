const { debugEnabled, playerEnabled } = require("../config.js");
const colors = require("colors");

/**
 * @function debug
 * @description Permet d'afficher un message aidant au débugage lorsque celui-ci est activé.
 * @param {String} message
 * @return {void}
 */
function debug(message) {
	if (debugEnabled == true) {
		return console.log("[DEBUG]".green, message);
	}
}

/**
 * @function debugError
 * @description Permet d'afficher un message d'erreur en console.
 * @param {String} message
 * @return {void}
 */
function debugError(message) {
	console.log("[ERROR]".red, message);
}

/**
 * @function playerMessage
 * @description Permet d'afficher un message concernant des informations à propos d'un joueur en console.
 * @param {String} message
 * @returns {void}
 */
function playerMessage(message) {
	if (playerEnabled == true) {
		return console.log("[PLAYER]".blue, message);
	}
}
module.exports = { debug, debugError, playerMessage };
