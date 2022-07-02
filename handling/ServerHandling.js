const { Server, WebSocket, } = require("ws");
const { port, maxPeople } = require("../config");
const {debug, debugError} = require("../utils/debug");
const {DataHandling} = require("./DataHandling")

/**
 * Classe du serveur. Il s'occupe de connecter, déconnecter et d'écouter ce que les clients lui envoie.
 * Les informations reçues sont envoyés à la classe DataHandling, qui elle envoie les informations dans les rooms dédiées.
 */
class ServerHandling {
/**
 * @param {String} protocol
 * @param {Class} dataHandling
 */
    constructor(protocol = null){
        this.protocol = protocol
        this.players
        this.dataHandling = new DataHandling()
    }

/**
 * La fonction lance le serveur et écoute quand quelqu'un se connecte.
 * Si quelqu'un se connecte, elle appelle on_connexion().
 * Si quelqu'un se déconnecte, elle appelle on_deconnexion().
 */
    run(){
        this.players = "0"

        const server = new Server({port:port, proto:this.protocol})

        debug(`Server started on port ${port} !`)
        debug("Nombre des joueurs : " + this.get_amount_player())

        server.on("connection", client => {
            this.on_connexion(client)
            debug("Nombre de joueurs : " + this.get_amount_player())

            if(this.players > maxPeople){
                this.dataHandling.send_data(client, {"qqchose":"Désolé mec"}, Date.now())
                client.close()
                }

            client.on("close", (code, reason)=>{
                this.on_deconnexion(code, reason)
            })
        }
    )}

/**
 * Quand un client se déconnecte, la fonction récupère le code et la raison de la déconnexion.
 * Il change aussi le nombre de personnes connectés actuellement (+1).
 * @param {String} code 
 * @param {String} reason 
 */
    on_deconnexion(code, reason){
        this.players -1
        debug(`Connexion closed with code: ${code}, raison: ${reason.toString() ? reason.toString() : "Aucune"}`);
    }

/**
 * Quand un client se connecte, la fonction récupère son ID et les informations du client et
 * les envoie dans le DataHandler qui s'occupe d'envoyer les informations aux bons endroits.
 * Il change aussi le nombre de personnes connectés actuellement (-1).
 * @param {WebSocket} client
 */
    on_connexion(client){
        this.players ++
        debug(`Une personne vient de se connecter, ID : ${JSON.stringify(client[0])}`)

        client.on("message", message =>{
            try {
                this.dataHandling.use_data(client, message, Date.now())
            } catch (error) {
                debugError(error);
            };
        })
    }
/**
 * Permet de connaitre le nombre de joueurs qu'il y a actuellement sur le serveur.
 * @returns this.players
 */
    get_amount_player() {
        return this.players
    }
    create_game(){

    }

    join_game(){

    }
    
    leave_game(){

    }

    delete_game(){

    }

}

module.exports = {ServerHandling};