const { port } = require("../config.js");
const DataBase = require("../Database/DataBase.js");
const { NotFoundError, BadRequestError, ForbidenError } = require("../ErrorSystem/Errors.js");
const { OkSuccess } = require("../ErrorSystem/Success.js");
const Debug = require("../utils/debug.js");
const HTTPServer = require("./HTTPServer.js");
const ServerInstance = require("./ServerInstance.js");
let instances = []
var amountInstance = 0

/**
 * Classe qui gère l'instanciation de ServerInstance sur différent port, pour éviter de surcharger certains serveurs. Plus tard elle pourra s'occuper de le faire mais sur d'autres machines.
 */
class Server {

	static run(){
		try{
			let something = []
			let serverInstance = new ServerInstance("firstServer", port, "lws-mirror-protocol")
			let HTTPServerInstance = new HTTPServer()
			serverInstance.run()
			something.push(serverInstance)
			something.push(HTTPServerInstance)
			instances.push(something)
			amountInstance = 1
			HTTPServerInstance.app.get("*", function(req, res){
				res.send("Hello World !")
			})
			return new OkSuccess(serverInstance, "Instanciation du premier serveur réussie")
		} catch {
			return new BadRequestError("Impossible de générer le premier serveur au port : " + port)
		}
	}

    static createServerInstance(serverName, protocol, serverPort){
		try {
			let serverInstance = new ServerInstance(serverName, protocol, serverPort)
			serverInstance.run()
			instances.push(serverInstance)
			amountInstance += 1
			return new OkSuccess(serverInstance, "Instanciation réussie")
		} catch {
			return new BadRequestError("Impossible d'instancier le serveur : " + serverName + " au port : " + serverPort)
		}
    }

	static deleteServerInstance(serverName){
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

module.exports = Server