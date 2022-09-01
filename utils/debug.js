const { debugEnabled} = require("../config.js");
const colors = require("colors");

class Debug{
/**
 * Permet d'afficher un message aidant au débugage lorsque celui-ci est activé.
 * @param {String} message
 * @return {void} DebugMessage
 */
	static debug(message) {
		if(debugEnabled) {
			return console.log("[DEBUG]".green, message)
		}
	}
/**
 * Permet d'afficher un message d'erreur dans l console.
 * @param {String} message
 * @return {void} DebugErrorMessage
 */
	static debugError(message) {
		return console.log("[ERROR]".red, message)
	}
}

module.exports = Debug;
