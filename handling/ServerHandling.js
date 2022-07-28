const { Server, WebSocket } = require  ("ws")
const { port, maxPlayer } = require("../config.js")
const Room =  require("../Game/Room")
const { debug, debugError } = require ("../utils/debug.js")
const DataHandling = require ("./DataHandling.js")

/**
 * Classe du serveur. Il s'occupe de connecter, déconnecter et d'écouter ce que les clients lui envoie.
 * Les informations reçues sont envoyés à la classe DataHandling, qui elle envoie les informations dans les rooms dédiées.
 */
class ServerHandling {
/**
 * @param {String} protocol
 */
    constructor(protocol = null){
        this.protocol = protocol
        this.players
        this.dataHandling = new DataHandling()
        this.lobby = []
    }

/**
 * La fonction lance le serveur et écoute quand quelqu'un se connecte.
 * Si quelqu'un se connecte, elle appelle on_connexion().
 * Si quelqu'un se déconnecte, elle appelle on_deconnexion().
 */
    run(){
        this.players = "0"

        const server = new Server({port:port, proto:this.protocol})

        console.log(`Server started on port ${port} !`)
        debug("Nombre des joueurs : " + this.players)

        server.on("connection", client => {
            this.dataHandling.create_lobby(1, 100)
            this.on_connexion(client)
            debug("Nombre de joueurs : " + this.players)

            if(this.players > maxPlayer){
                this.dataHandling.send_data(client, {"error":"Too many player connected"}, Date.now())
                client.close()
                /*this.dataHandling.create_lobby(15, 25)
                this.dataHandling.create_player(25, "Cardiaque", client)*/
                }

            client.on("close", (code, reason)=>{
                this.on_deconnexion(code, reason)
            })
        }
    )}

/**
 * Quand un client se déconnecte, la fonction récupère le code et la raison de la déconnexion.
 * Il change aussi le nombre de personnes connectés actuellement (-1).
 * @param {String} code 
 * @param {String} reason 
 */
    on_deconnexion(code, reason){
        this.players =-1
        debug(`Connexion closed with code: ${code}, raison: ${reason.toString() ? reason.toString() : "Aucune"}`);
    }

/**
 * Quand un client se connecte, la fonction récupère son ID et les informations du client et
 * les envoie dans le DataHandler qui s'occupe d'envoyer les informations aux bons endroits.
 * Il change aussi le nombre de personnes connectés actuellement (+1).
 * @param {WebSocket} client
 */
    on_connexion(client){
        this.players ++
        console.log(`Une personne vient de se connecter, ID : ${JSON.stringify(client[0])}`)

        client.on("message", message =>{
            try {
                this.dataHandling.use_data(client, message, Date.now())
                console.log("Nouveau message")
            } catch (error) {
                debugError(error);
            };
        })
    }
/**
 * Permet de connaitre le nombre de joueurs qu'il y a actuellement sur le serveur.
 * @returns this.players
 */
    get_amount_players() {
        return this.players
    }

/**
 * Permet de connaitre le nombre de parties en cours sur ce serveur.
 * @returns this.lobby.length()
 */
    get_amount_games() {
        return this.lobby.length()
    }

    join_game(){

    }
    
    leave_game(playerID){

    }

    delete_game(){

    }

}

module.exports = ServerHandling;