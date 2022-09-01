const { WebSocket } = require("ws");
const { maxPlayer, physicTicAmount } = require("../config.js");
const { UnauthorizedError } = require("../ErrorSystem/Errors.js");
const { OkSuccess } = require("../ErrorSystem/Success.js");
const Players = require("../Player/Player.js");
const Debug = require("../utils/debug.js");
const PackageManager = require("./ServerSystems/PackageManager.js");

class ServerInstance{
    /**
     * 
     * @param {String} serverName 
     * @param {Number} port 
     * @param {String} protocol 
     * @param {Number} amountPlayer 
     */
    constructor(serverName, port=null, protocol=null, amountPlayer=null){
        this.serverName = serverName
        this.port = port
        this.protocol = protocol
        if(amountPlayer){
            this.amountPlayer = amountPlayer
        } else {
            this.amountPlayer = maxPlayer
        }
        this.players = 0
        this.packageManager = new PackageManager()
        this.runStatut = true
        this.allPlayers = []
        this.id = Math.random() * 50
        this.physicTic = physicTicAmount
    }
/**
 * Démarre le protocole WebSocket et trie pour l'instant les messages entrant. Plus tard se sera délégué à l'EventHandler
 */
    run(){
        const server = new WebSocket.Server({ port: this.port, proto: this.protocol });

		Debug.debug(`Server started on port ${this.port}, with protocol : ${this.protocol}!`);

		server.on("connection", (client) => {
            client.on("message", (message)=> {
                let StringMessage = message.toString()
                let parsedMessage = JSON.parse(StringMessage);
                Debug.debug("YOOOOO !")
                console.log(parsedMessage)
                switch(true){            
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
                        let something = new Players(parsedMessage.player.position,
                            parsedMessage.player.rotation,
                            parsedMessage.player.username,
                            parsedMessage.player.tag,
                            parsedMessage.player.id,
                            client,
                            version++)
                        Debug.debugError("MMMMMMMHH")
                        Debug.debug(something)
                        this.allPlayers.push(something)
                        this.packageManager.addClient(something)
                        something.getAllPackets()
                        break;
                    case parsedMessage.status == "deconnexion":
                        this.packageManager.removeClient(parsedMessage.data.account.id, client)
                        console.log("Un joueur s'est déconnecté")
                        break;
                    default:
                        console.log("DEFAULT")
                }
            })
                if (this.players > this.amountPlayer) {
				client.send(Buffer.from(new UnauthorizedError("Impossible de se connecter pour l'instant"), "utf8"))
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
    async runLogic(){
        this.runStatut = true
        while(this.runStatut == true){
            let startWork = Date.now()
            let eachTics = 1000/physicTicAmount
            this.packageManager.sendPackages(this.allPlayers)
            let endWork = Date.now() - startWork
            //Debug.debug("Coucou les mecs ! " + Date.now())
            console.log(eachTics, " - ", endWork)
            await new Promise(resolve => setTimeout(resolve, 1000/eachTics-endWork));
        }
    }

}

module.exports = ServerInstance