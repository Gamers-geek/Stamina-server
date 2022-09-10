import { Configuration } from "../config.js";
import { ErrorSystem } from "../ErrorsAndSuccess/Errors";
import NotFoundError = ErrorSystem.NotFoundError
import BadRequestError = ErrorSystem.BadRequestError
import ForbidenError = ErrorSystem.ForbidenError
import { SuccessSystem } from "../ErrorsAndSuccess/Success";
import OkSuccess = SuccessSystem.OkSuccess
import Debug from "../utils/debug.js";
import HTTPServer from "./HTTPServer.js";
import ServerInstance from "./ServerInstance";
let instances:any[] = []
var amountInstance = 0

/**
 * Classe qui gère l'instanciation de ServerInstance sur différent port, pour éviter de surcharger certains serveurs. Plus tard elle pourra s'occuper de le faire mais sur d'autres machines.
 */
export default class Server {

	static run(){
		try{
			let something = []
			let serverInstance = new ServerInstance("firstServer", Configuration.config.port, "lws-mirror-protocol")
			let HTTPServerInstance = new HTTPServer.Server()
			serverInstance.run()
			something.push(serverInstance)
			something.push(HTTPServerInstance)
			instances.push(something)
			amountInstance = 1
			return new OkSuccess(serverInstance, "Instanciation du premier serveur réussie")
		} catch {
			return new BadRequestError("Impossible de générer le premier serveur au port : " + Configuration.config.port)
		}
	}

    static createServerInstance(serverName:string, protocol:string, serverPort:number){
		try {
			let serverInstance = new ServerInstance(serverName, serverPort, protocol)
			serverInstance.run()
			instances.push(serverInstance)
			amountInstance += 1
			return new OkSuccess(serverInstance, "Instanciation réussie")
		} catch {
			return new BadRequestError("Impossible d'instancier le serveur : " + serverName + " au port : " + serverPort)
		}
    }

	static deleteServerInstance(serverName:string){
		try {
			let serverToDelete = instances.indexOf(instances.find(server => server.serverName == serverName))
			instances.splice(serverToDelete)
			return new OkSuccess(serverName, "Le serveur a été correctement supprimé")
		} catch{
			return new NotFoundError("L'instance du serveur : \"" + serverName + "\" n'existe pas")
		}
	}

	static getAllServerInstances(){
		try {
			return new OkSuccess(instances, "Toutes les instances de serveur")
		} catch{
			return new ForbidenError("Impossible de répondre à la requête")
		}
	}
}