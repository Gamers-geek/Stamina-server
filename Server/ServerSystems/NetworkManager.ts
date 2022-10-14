import ErrorSystem from "../../ErrorsAndSuccess/Errors"
import { Configuration } from '../../config'
import WebSocket from 'ws'
import Logger from "../../utils/logger"
import ServerSystem from '../Server'

interface dataToSend {
    Players:Array<smallPlayer>;
    version:number;
    Data:Array<any>;
}

interface smallPlayer {
    id:number;
    position: {
        x:number;
        y:number;
        z:number;
    };
    rotation: number;
}

namespace NetworkSystem{

    export class PackageManager {
        static version: number = 0
        static actualVersion: Array<any>
        static allOldVersion: Array<any>
        static oldVersionsOrder: Array<number>

        static async sendPackages(): Promise<void> {
            let dataToSend: dataToSend = { Players: [], version: PackageManager.version, Data: [] }
            try {
                ServerSystem.Node.players.forEach(player => {
                    var playerToSend:smallPlayer = {
                        position:{
                            x:0,
                            y:0,
                            z:0
                        },
                        rotation:0,
                        id:0
                    };
                    playerToSend.position.x = player.position.x;
                    playerToSend.position.z = player.position.z;
                    playerToSend.position.y = player.position.y;
                    playerToSend.rotation = player.rotation;
                    playerToSend.id = player.ID;
                    dataToSend.Players.push(playerToSend)
                });
                ServerSystem.Node.players.forEach(player => {
                    player.client.send(Buffer.from(JSON.stringify(dataToSend), "utf-8"))
                });
                Logger.debug(dataToSend)
            } catch {
                Logger.info(new ErrorSystem.BadRequestError("There is an unknown problem on this server"))
            }
        }
    }

    export class EventHandler {
        static launch() {
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
                            Logger.info(parsedMessage)
                            ServerSystem.Node.updatePlayer(
                                parsedMessage.playerInformation.id,
                                parsedMessage.playerInformation.position,
                                parsedMessage.playerInformation.rotation)
                            break;
                        case parsedMessage.type == "connexion":
                            ServerSystem.Node.addPlayer(parsedMessage.data, client)
                            Logger.info("Un client s'est connecté : " + parsedMessage.data.username  + "#" + parsedMessage.data.tag + " / " + parsedMessage.data.id)
                            break;
                        case parsedMessage.type == "deconnexion":
                            ServerSystem.Node.removePlayer(parsedMessage.data.id)
                            Logger.info("Un client s'est déconnecté" + parsedMessage.data.username  + "#" + parsedMessage.data.tag + " / " + parsedMessage.data.ID)
                            break;
                        default:
                            Logger.info("Le type de message reçu ne correspond à aucun évènement du serveur. \n" + parsedMessage)
                    }
                })
                if (ServerSystem.Node.players.length > Configuration.server.maxPlayer) {
                    let sorryMessage:ErrorSystem.UnauthorizedError = new ErrorSystem.UnauthorizedError("Impossible de se connecter pour l'instant")
                    client.send(Buffer.from(JSON.stringify(sorryMessage), "utf8"))
                    client.close();
                } else {
                    Logger.info("Quelqu'un s'est connecté")
                }
                client.on("close", (code, reason) => {
                    Logger.info("Quelqu'un s'est déconnecté du serveur : " + Configuration.server.serverName)
                });
            })
        }
    }
}

export default NetworkSystem