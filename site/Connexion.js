//Fichier exclusif aux apis, il n'a "rien à voir" avec le serveur. Juste je l'ai créé la pour pouvoir le tester en temps réel

const { debug, debugError } = require ("../utils/debug.js")
const { WebSocket } = require("ws")

let request = {
    "client_type":"api",
    "method":"",
    "data":{}
}

class Api {
    constructor(protocol){
        this.protocol = protocol
        this.client = new WebSocket("ws://localhost:2025")
        this.players_amount = -1
        this.games_amount = 5
    }

    run(){
        let timelapse = Date.now()
        this.client.on("open", ws => {
            timelapse = timelapse - Date.now()
            debug(timelapse)
            debug("Api connectée")
            this.setplayers()
        })
        this.client.on("message", message => {
            let StringMessage = message.toString()
            let parsedMessage = JSON.parse(StringMessage)
            debug("Le serveur a envoyé : ", parsedMessage)

            if(parsedMessage.amount_players){
                this.players_amount = parsedMessage.amount_players
                debug("Reçu une réponse par rapport à la quantité de personnes connectées")
            }

            if(parsedMessage.amount_games){
                this.games_amount = parsedMessage.amount_games
                debug("Reçu une réponse par rapport à la quantité de parties en cours")
            }
            
            
        })
        this.client.on("close", ws => {
            debug("Api éteinte")
        })
    }

/**
 * @returns amount of players
 */
    /*get_players_amount(){
        let n = -1
        while(this.players_amount === -1){
            if (n != -1){
                return this.players_amount
            } else n = this.players_amount
            console.log(n)
        }

        /*let requestsend = false
        let requestreceive = false
        if(this.client.readyState == this.client.OPEN){
            request.method = 'getplayersamount'
            request.data = {}
            let str = JSON.stringify(request)
            let buff = Buffer.from(str, "utf-8")
            this.client.send(buff) 
            requestsend = true
        }

        else if(this.client.readyState == this.client.CLOSED || this.client.readyState == this.client.CLOSING){
            return("Connexion closed")
        }

        else if(this.client.readyState == this.client.CONNECTING){
            setTimeout(() => {
                this.get_players_amount()
            }, 100);
        }
        if (requestsend == true){
            setTimeout(() => {
                requestreceive = true
            }, 100)
        }
        if(requestreceive == true){
            return this.players_amount
        }*/

    //}

    setplayers(){
        request.method = 'getplayersamount'
        request.data = {}
        let str = JSON.stringify(request)
        let buff = Buffer.from(str, "utf-8")
        this.client.send(buff) 
    }

    get_games_amount(){
        let requestsend = false
        if(this.client.readyState == 1){
            request.method = 'getgamesamount'
            request.data = {}
            let str = JSON.stringify(request)
            let buff = Buffer.from(str, "utf-8")
            this.client.send(buff) 
        }

        else if(this.client.readyState == this.client.CLOSED || this.client.readyState == this.client.CLOSING){
            return("Connexion closed")
        }

        else if(this.client.readyState == this.client.CONNECTING){
            setTimeout(() => {
                this.get_games_amount()
            }, 100);
        }
        if (requestsend == true){
            setTimeout(() => {
                return this.amount_games
            }, 100)
        }
    }
}

module.exports = Api;