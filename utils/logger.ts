import { Configuration } from "../config";
import colors from "colors";
import ErrorSystem from "../ErrorsAndSuccess/Errors";
import SuccessSystem from "../ErrorsAndSuccess/Success";
import { Player } from "../Player/Player";


/**
 * Classe qui gère les messages dans la console. Entièrement en static, car pas besoin de l'instancier pour l'utiliser
 */
export default class Logger {
	/**
	 * Permet d'afficher un message aidant au débugage lorsque celui-ci est activé.
	 * @param {any} message
	 * @return {void} DebugMessage
	 */
	static debug(message: any): void {

		if (Configuration.debug.debugEnabled == true) {
			return console.log("[DEBUG]", message)
		} else {
			//return console.log("[NO DEBUG] " + message)
		}
	}

	/**
	  * Permet d'afficher un message aidant au débugage lorsque celui-ci est activé.
	  * @param {String} message
	  * @return {void} DebugMessage
	  */
	static info(message: any): void {
		if(Configuration.debug.logEnabled == true){
			const date = new Date();
			const messageDate = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth()+1/*sont con on est obligé de rajouter +1*/}/${date.getFullYear()}]`
			this.save(`${messageDate} ${message}`);
			return console.log(messageDate, message)	
		}
	}

	private static save(message: string):void{
		//WIP
	}

	/**
	 * Permet d'afficher un message d'erreur dans l console.
	 * @param {String} message
	 * @return {void} DebugErrorMessage
	 */
	static debugError(message: string): void {
		return console.log("[ERROR]".red, message)
	}
}