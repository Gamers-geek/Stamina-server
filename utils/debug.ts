import { Configuration } from "../config";
import colors from "colors";

/**
 * Classe qui gère les messages dans la console. Entièrement en static, car pas besoin de l'instancier pour l'utiliser
 */
export default class Debug{
/**
 * Permet d'afficher un message aidant au débugage lorsque celui-ci est activé.
 * @param {String} message
 * @return {void} DebugMessage
 */
	static debug(message:any): void {
		if(typeof message.toString == "function") message = message.toString()

		if(Configuration.config.debugEnabled == true) {
			return console.log("[DEBUG] " + message)
		} else {
			return console.log("[NO DEBUG] " + message)
		}
	}
/**
 * Permet d'afficher un message d'erreur dans l console.
 * @param {String} message
 * @return {void} DebugErrorMessage
 */
	static debugError(message:string): void {
		return console.log("[ERROR]".red, message)
	}
}