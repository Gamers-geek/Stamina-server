import { Vector3 } from 'three'
import { Player } from '../../Player/Player'
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

namespace NetworkSystem{
    let allClients:any[] = []
    export class PackageManager {
        static version: number = 0
        static actualVersion: Array<any>
        static allOldVersion: Array<any>
        static oldVersionsOrder: Array<any>
        static players: any
        /**
         * 
         * @param {Array} allPlayers 
         */

        static sendPackages(allPlayers: Array<Player>): void {
            //console.log(allPlayers)
            let dataToSend: typeDataToSend = { Players: [], version: PackageManager.version, Data: [] }
            /*if(data){
                dataToSend.Data = data
            }*/
            allPlayers.forEach((player, index) => {
                let somethingToSend = dataToSend.Players.splice(index)
                dataToSend.Players.push({ position: player.position, rotation: player.rotation })
                player.client.send(Buffer.from(JSON.stringify(somethingToSend), "utf-8"))
            })
            //Debug.debug(dataToSend)
            dataToSend = { "Players": [], "version": this.version, "Data": [] }
        }

        static addClient(clientToAdd: any) {
            console.log("YO !")
            try {
                PackageManager.players.push(clientToAdd)
                PackageManager.allOldVersion.push(PackageManager.actualVersion)
                PackageManager.oldVersionsOrder.push(PackageManager.version)
                PackageManager.version++
                return new SuccessSystem.OkSuccess(clientToAdd, "Le joueur a été rajouté avec succès")
            } catch {
                return new ErrorSystem.BadRequestError("Impossible de rajouter un joueur")
            }
        }

        static removeClient(clientToRemove: any) {
            try {
                let remove = PackageManager.players.find((player: any) => player == clientToRemove)
                PackageManager.players.splice(remove)
                PackageManager.allOldVersion.push(PackageManager.actualVersion)
                PackageManager.oldVersionsOrder.push(PackageManager.version)
                PackageManager.version++
                return new SuccessSystem.OkSuccess(clientToRemove, "Le joueur a été retiré avec succès")
            } catch {
                return new ErrorSystem.NotFoundError("Le joueur que vous essayez de retirer n'existe pas")
            }
        }

        static createNewVersion() {
            try {
                PackageManager.allOldVersion.push(PackageManager.actualVersion)
                PackageManager.oldVersionsOrder.push(PackageManager.version)
                PackageManager.version++
                return new SuccessSystem.OkSuccess(PackageManager.version, "Nouvelle version créé avec succès")
            } catch {
                return new ErrorSystem.BadRequestError("Impossible de créer une nouvelle version")
            }
        }
        /**
         * @param {Array} allMissingVersions
         * @param {Players.name} player
         */
        static sendMissingPackets(allMissingVersions: any, player: any) {

        }

    }

    export class EventHandler {
        static launch(){
            const server = new WebSocket.Server({ port: Configuration.server.port })
            Logger.info(`Server started on port ${Configuration.server.port}, with protocol : ${Configuration.server.protocol}!`);
            server.on("connection", (client) => {
                allClients.push(client)
                client.on("message", (message) => {
                    let StringMessage = message.toString()
                    let parsedMessage = JSON.parse(StringMessage);
                    Logger.debug("YOOOOO !")
                    switch (true) {
                        case !parsedMessage:
                            Logger.info("Invalid message format")
                            break;
                        case parsedMessage.status == "client":
                            if(parsedMessage.data.server){
                                ModuleSystem.ModuleEvent.updateModule(parsedMessage.data.server)
                            }
                            else if(parsedMessage.data.module){
                                ModuleSystem.ModuleEvent.receiveForModule(parsedMessage.data.module.name, parsedMessage.data.module.data)
                            }
                            break;
                        case parsedMessage.status == "connexion":
                            ModuleSystem.ModuleEvent.clientConnexion(parsedMessage.data)
                            break;
                        case parsedMessage.status == "deconnexion":
                            ModuleSystem.ModuleEvent.clientDeconnexion(parsedMessage.data)
                            NetworkSystem.PackageManager.removeClient(parsedMessage.data.account.id)
                            console.log("Un joueur s'est déconnecté")
                            break;
                        default:
                            console.log("DEFAULT")
                    }
                })
                if (allClients.length > Configuration.server.maxPlayer) {
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
        }
    }
}

export default NetworkSystem