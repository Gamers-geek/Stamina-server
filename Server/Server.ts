import { Configuration } from "../config.js";
import { ErrorSystem } from "../ErrorsAndSuccess/Errors";
import UnauthorizedError = ErrorSystem.UnauthorizedError
import { SuccessSystem } from "../ErrorsAndSuccess/Success";
import Logger from "../utils/logger.js";
import { WebSocket } from "ws";
import { Player } from "../Player/Player.js";
import PacketSystem from "./ServerSystems/PackageManager.js";
import PackageManager = PacketSystem.PackageManager

/**
 * Classe qui gère l'instanciation de ServerInstance sur différent port, pour éviter de surcharger certains serveurs. Plus tard elle pourra s'occuper de le faire mais sur d'autres machines.
 */
export default class ServerSystem {
	static instances:any[] = []
	static allPlayers:any[] = []

	static run(){
	const server = new WebSocket.Server({ port: Configuration.config.port });

	Logger.info(`Server started on port ${Configuration.config.port}, with protocol : ${Configuration.config.protocol}!`);

        server.on("connection", (client) => {
            client.on("message", (message) => {
                let StringMessage = message.toString()
                let parsedMessage = JSON.parse(StringMessage);
                Logger.debug("YOOOOO !")
                console.log(parsedMessage)
                switch (true) {
                    case !parsedMessage:
                        console.log("Invalid message format")
                        break;
                    case parsedMessage.status == "client":
                        console.log("something")
                        //this.handle_data_for_clients(client, parsedMessage)
                        break
                    case parsedMessage.status == "connexion":
                        console.log("Un joueur s'est connecté")
                        let version = PackageManager.version
                        let something = new Player(parsedMessage.player.position,
                            parsedMessage.player.rotation,
                            parsedMessage.player.username,
                            parsedMessage.player.tag,
                            parsedMessage.player.id,
                            version++,
                            client
                        )
                        Logger.debugError("MMMMMMMHH")
                        Logger.debug(something)
                        ServerSystem.allPlayers.push(something)
                        PackageManager.addClient(something)
                        break;
                    case parsedMessage.status == "deconnexion":
                        PackageManager.removeClient(parsedMessage.data.account.id)
                        console.log("Un joueur s'est déconnecté")
                        break;
                    default:
                        console.log("DEFAULT")
                }
            })
            if (ServerSystem.allPlayers.length > Configuration.config.maxPlayer) {
                let hehe: any = new UnauthorizedError("Impossible de se connecter pour l'instant")
                client.send(Buffer.from(hehe, "utf8"))
                client.close();
            } else {
                //Debug.debug(new OkSuccess(client, "Nouveau client connecté !"))
                //Debug.debug(this.packageManager.addClient(new Players({x:0.2, y:0.3, z:58.0}, 1.265548, "Gipson62", 256, 2365, client, this.packageManager, 1)))
                console.log("Quelqu'un s'est connecté")
            }


            client.on("close", (code, reason) => {
                console.log("Quelqu'un s'est déconnecté du serveur : " + Configuration.config.serverName)
            });
        })
        ServerSystem.runLogic()
    }

	static async runLogic() {
        while (Configuration.config.runServer == true) {
            let startWork = Date.now()
            let eachTics = 1000 / Configuration.config.physicTic
            PackageManager.sendPackages(this.allPlayers)
            let endWork = Date.now() - startWork
            //Debug.debug("Coucou les mecs ! " + Date.now())
            //console.log(eachTics, " - ", endWork)
            await new Promise(resolve => setTimeout(resolve, 1000 / eachTics - endWork));
        }
    }
}