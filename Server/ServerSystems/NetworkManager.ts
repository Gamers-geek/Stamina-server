import { Vector3 } from 'three'
import ErrorSystem from "../../ErrorsAndSuccess/Errors"
import SuccessSystem from "../../ErrorsAndSuccess/Success"
import ModuleSystem from "./ModuleSystem"
import { Configuration } from '../../config'
import WebSocket from 'ws'
import Logger from "../../utils/logger"

interface typeDataToSend {
    Players: Array<smallPlayer>,
    version: number,
    Data: Array<data>,
}

type dataEvent = ""

interface data {
    type: dataEvent,
    player: number
}

interface smallPlayer {
    position: Vector3,
    rotation: number
}

interface Client {
    user:any;
    id:number;
    username:string;
    tag:number;
}

namespace NetworkSystem{
    let allClients:Array<Client> = []
    export function getClientByID(ID:number){

    }
    export class PackageManager {
        static dataToSend:any = {}
        static version: number = 0
        static actualVersion: Array<any>
        static allOldVersion: Array<any>
        static oldVersionsOrder: Array<number>

        static async sendPackages(): Promise<void> {
            //Améliorer la fonction pour que dataToSend quand il est pris correspond aux données rajoutées par les modules.
            let dataToSend: typeDataToSend = { Players: [], version: PackageManager.version, Data: [] }
            /*if(data){
                dataToSend.Data = data
            }*/
            await ModuleSystem.ModuleEvent.networkSend()
            try {
                allClients.forEach(client => {
                    client.user.send(Buffer.from(JSON.stringify(dataToSend), "utf-8"))
                })
                //Debug.debug(dataToSend)
                PackageManager.dataToSend = { "Players": [], "version": this.version, "Data": [] }
            } catch {
                Logger.info(new ErrorSystem.BadRequestError("There is an unknown problem on this server"))
            }
        }

        static addClient(clientToAdd: any, WebSocketClient:any) {
            try{
                allClients.push({
                    username:clientToAdd.username,
                    id:clientToAdd.id,
                    user:WebSocketClient,
                    tag:clientToAdd.tag
                })
                return new SuccessSystem.OkSuccess("Client created successfuly !")
            } catch {
                return
            }
        }

        static removeClient(clientToRemove:Client) {
            try {
                let removedClient = allClients.findIndex(client => {
                    client.id = clientToRemove.id
                })
                allClients.splice(removedClient)
                return new SuccessSystem.OkSuccess("Client " + clientToRemove.username + " successfully removed")
            } catch {
                return new ErrorSystem.NotFoundError("The client don't exist on this server.")
        }
        }

        static createNewVersion() {
            //Refaire aussi le système de version. car il doit prendre en compte les modules ajouter.
        }
        /**
         * @param {Array} allMissingVersions
         * @param {Players.name} player
         */
        static sendMissingPackets(allMissingVersions: any, player: any) {
            //Refaire cette fonction et la rendre private, car c'est le PackageManager qui s'occupe de la gestion des paquets manquant.
        }

    }

    export class EventHandler {
        static launch(){
            const server = new WebSocket.Server({ port: Configuration.server.port })
            Logger.info(`Server started on port ${Configuration.server.port}, with protocol : ${Configuration.server.protocol}!`);
            server.on("connection", (client) => {
                client.on("message", (message) => {
                    let StringMessage = message.toString()
                    let parsedMessage = JSON.parse(StringMessage);
                    switch (true) {
                        case !parsedMessage:
                            Logger.info("Invalid message format")
                            break;
                        case parsedMessage.type == "client":
                            if(parsedMessage.data.server){
                                ModuleSystem.ModuleEvent.updateModule(parsedMessage.data.server)
                            }
                            else if(parsedMessage.data.module){
                                ModuleSystem.ModuleEvent.receiveForModule(parsedMessage.data.module.name, parsedMessage.data.module.data)
                            }
                            break;
                        case parsedMessage.type == "connexion":
                            allClients.push({
                                user:client,
                                id:parsedMessage.data.player.id,
                                username:parsedMessage.data.player.username,
                                tag:parsedMessage.data.player.tag
                            })
                            ModuleSystem.ModuleEvent.clientConnexion(parsedMessage.data, client)
                            Logger.info("Un client s'est connecté : " + parsedMessage.data.username  + "#" + parsedMessage.data.tag + " / " + parsedMessage.data.ID)
                            break;
                        case parsedMessage.type == "deconnexion":
                            ModuleSystem.ModuleEvent.clientDeconnexion(parsedMessage.data)
                            NetworkSystem.PackageManager.removeClient(parsedMessage.data.account.id)
                            Logger.info("Un client s'est déconnecté" + parsedMessage.data.username  + "#" + parsedMessage.data.tag + " / " + parsedMessage.data.ID)
                            break;
                        default:
                            Logger.info("Le type de message reçu ne correspond à aucun évènement du serveur. \n" + parsedMessage)
                    }
                })
                if (allClients.length > Configuration.server.maxPlayer) {
                    let hehe:any = new ErrorSystem.UnauthorizedError("Impossible de se connecter pour l'instant")
                    client.send(Buffer.from(hehe, "utf8"))
                    client.close();
                } else {
                    //Debug.debug(new OkSuccess(client, "Nouveau client connecté !"))
                    //Debug.debug(this.packageManager.addClient(new Players({x:0.2, y:0.3, z:58.0}, 1.265548, "Gipson62", 256, 2365, client, this.packageManager, 1)))
                    Logger.debug("Quelqu'un s'est connecté")
                }
                client.on("close", (code, reason) => {
                    Logger.debug("Quelqu'un s'est déconnecté du serveur : " + Configuration.server.serverName)
                });
            })
        }
    }
}

export default NetworkSystem