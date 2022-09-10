import { WebSocket } from "ws";
import { Configuration } from "../config.js";
import { ErrorSystem } from "../ErrorsAndSuccess/Errors";
import UnauthorizedError = ErrorSystem.UnauthorizedError
import { SuccessSystem } from "../ErrorsAndSuccess/Success";
import OkSuccess = SuccessSystem.OkSuccess
import { Player } from "../Player/Player.js";
import Debug from "../utils/logger.js";
import PacketSystem from "./ServerSystems/PackageManager.js";

export default class ServerInstance {
    /**
     * 
     * @param {String} serverName 
     * @param {Number} port 
     * @param {String} protocol 
     * @param {Number} amountPlayer 
     */
    serverName: string
    port: number
    protocol: string
    amountPlayer: number
    players: number
    packageManager: PacketSystem.PackageManager
    runStatut: boolean
    allPlayers: any[]
    id: number
    physicTic: number
    constructor(serverName: string, port?: number, protocol?: string, amountPlayer?: number) {
        this.serverName = serverName
        if (port) {
            this.port = port
        } else this.port = Configuration.config.port
        if (protocol) this.protocol = protocol
        else this.protocol = "lws-mirror-protocol"
        if (amountPlayer) {
            this.amountPlayer = amountPlayer
        } else {
            this.amountPlayer = Configuration.config.maxPlayer
        }
        this.players = 0
        this.packageManager = new PacketSystem.PackageManager()
        this.runStatut = true
        this.allPlayers = []
        this.id = Math.random() * 50
        this.physicTic = Configuration.config.physicTicAmount
    }
    /**
     * Démarre le protocole WebSocket et trie pour l'instant les messages entrant. Plus tard se sera délégué à l'EventHandler
     */
    run() {
        const server = new WebSocket.Server({ port: this.port });

        Debug.info(`Server started on port ${this.port}, with protocol : ${this.protocol}!`);

        server.on("connection", (client) => {
            client.on("message", (message) => {
                let StringMessage = message.toString()
                let parsedMessage = JSON.parse(StringMessage);
                Debug.debug("YOOOOO !")
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
                        let version = this.packageManager.version
                        let something = new Player(parsedMessage.player.position,
                            parsedMessage.player.rotation,
                            parsedMessage.player.username,
                            parsedMessage.player.tag,
                            parsedMessage.player.id,
                            version++,
                            client
                        )
                        Debug.debugError("MMMMMMMHH")
                        Debug.debug(something)
                        this.allPlayers.push(something)
                        this.packageManager.addClient(something)
                        break;
                    case parsedMessage.status == "deconnexion":
                        this.packageManager.removeClient(parsedMessage.data.account.id)
                        console.log("Un joueur s'est déconnecté")
                        break;
                    default:
                        console.log("DEFAULT")
                }
            })
            if (this.players > this.amountPlayer) {
                let hehe: any = new UnauthorizedError("Impossible de se connecter pour l'instant")
                client.send(Buffer.from(hehe, "utf8"))
                client.close();
            } else {
                //Debug.debug(new OkSuccess(client, "Nouveau client connecté !"))
                //Debug.debug(this.packageManager.addClient(new Players({x:0.2, y:0.3, z:58.0}, 1.265548, "Gipson62", 256, 2365, client, this.packageManager, 1)))
                console.log("Quelqu'un s'est connecté")
            }


            client.on("close", (code, reason) => {
                console.log("Quelqu'un s'est déconnecté du serveur : " + this.serverName)
            });
        })
        this.runLogic()
    }
    /**
     * Fonction lancer une fois lors du run(), qui relance tout les 20ms la logique du serveur.
     */
    async runLogic() {
        this.runStatut = true
        while (this.runStatut == true) {
            let startWork = Date.now()
            let eachTics = 1000 / this.physicTic
            this.packageManager.sendPackages(this.allPlayers)
            let endWork = Date.now() - startWork
            //Debug.debug("Coucou les mecs ! " + Date.now())
            //console.log(eachTics, " - ", endWork)
            await new Promise(resolve => setTimeout(resolve, 1000 / eachTics - endWork));
        }
    }

}