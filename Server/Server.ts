import ErrorSystem from "../ErrorsAndSuccess/Errors"
import SuccessSystem from "../ErrorsAndSuccess/Success"
import NetworkSystem from "./ServerSystems/NetworkManager"
import ModuleSystem from "./ServerSystems/ModuleSystem"
import { Configuration } from "../config"
import Logger from "../utils/logger"
import WebSocket from 'ws'
import {Player} from "../Player/Player"

namespace ServerSystem {
    
    export class Node {
        static allPlayers:any[] = []
        static start(){
            const server = new WebSocket.Server({ port: Configuration.server.port });

            Logger.info(`Server started on port ${Configuration.server.port}, with protocol : ${Configuration.server.protocol}!`);
        
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
                                let version = NetworkSystem.PackageManager.version
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
                                Node.allPlayers.push(something)
                                NetworkSystem.PackageManager.addClient(something)
                                break;
                            case parsedMessage.status == "deconnexion":
                                NetworkSystem.PackageManager.removeClient(parsedMessage.data.account.id)
                                console.log("Un joueur s'est déconnecté")
                                break;
                            default:
                                console.log("DEFAULT")
                        }
                    })
                    if (Node.allPlayers.length > Configuration.server.maxPlayer) {
                        let hehe: any = new ErrorSystem.UnauthorizedError("Impossible de se connecter pour l'instant")
                        client.send(Buffer.from(hehe, "utf8"))
                        client.close();
                    } else {
                        //Debug.debug(new OkSuccess(client, "Nouveau client connecté !"))
                        //Debug.debug(this.packageManager.addClient(new Players({x:0.2, y:0.3, z:58.0}, 1.265548, "Gipson62", 256, 2365, client, this.packageManager, 1)))
                        console.log("Quelqu'un s'est connecté")
                    }
        
        
                    client.on("close", (code, reason) => {
                        console.log("Quelqu'un s'est déconnecté du serveur : " + Configuration.server.serverName)
                    });
                })
                ModuleSystem.ModuleLoader.setupModules()
                Node.runLogic()
            }

        static async runLogic(){
            Logger.info("Démarrage de la logique");
            let eachTics = 1000/Configuration.server.physicTic;
            Logger.debug(eachTics)
            while (Configuration.server.runServer == true) {
                let startWork = Date.now()
                NetworkSystem.PackageManager.sendPackages(Node.allPlayers)
                Logger.info("Coucou les mecs ! " + Date.now())
                let endWork = Date.now() - startWork
                Logger.info(eachTics - endWork)
                await new Promise(resolve => setTimeout(resolve, eachTics - endWork));
            }
        }

        static restart(){
            Configuration.server.runServer = false
            ModuleSystem.ModuleLoader.refresh()
            Configuration.server.runServer = true
        }

        static stop(){
            Configuration.server.runServer = false
            Logger.info("Server just stopped")
        }
    }
}

export default ServerSystem