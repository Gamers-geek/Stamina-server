const { debug, debugError } = require ("../utils/debug.js")
const Player = require("./entities/actor/players/player.js")


class Room {
    /** 
     * @param {int} id 
     * @param {Array} players 
     * @param {int} max_players
     */
    constructor(id, max_players){
        this.id = id
        //this.players = players
        this.max_players = max_players
        this.players = []
    }

/**
 * @param {int} tag 
 * @param {String} username
 * @param {int} id
 * @param {WebSocket} client
 * Instancie une nouvelle classe Player qui s'occupera de gérer la logique d'un joueur défini par son id et username
 */
    create_players(tag, username, id, client){
        const player = this.players.find(player => player.id = id)
        if(player){
            player.client = client
            debug("Un joueur déjà existant a été modifié")
        } else {
        this.players.push(new Player(tag, username, id, client))
        debug("Un joueur a été créé")
        //this.players[tag] = {username: username, tag: tag, client:client }
    }
        debug(`Tout les joueurs : ${JSON.stringify(this.players)}`)
    }
/**
 * 
 * @param {String} tag 
 * @param {Stirng} username 
 * @param {WebSocket} client 
 * @returns 
 */
    delete_players(id, client){
        try {
            this.hehe = this.players.indexOf(this.players.find(player => player.id == id))
            client.send("Désolé mec, t'es supprimé")
            client.close(undefined, "Quelqu'un vous a supprimé")
            this.players.splice(this.hehe, 1)
            return(`Player deleted ${username}#${tag}`)
        } catch {
            return("No player or disfunctional function")
        }
    }
/**
 * @param {int} tag
 * @param {String} username
 * @param {WebSocket} client 
 */
    find_players(tag, username, client){
        try {
            debug("Trouvé via l'id : " + this.players.find(player => player.tag = tag))
            this.players.find(player => player.tag = tag).validate_position((0.1,25,25))
        } catch {
            debug("Trouvé via le pseudo : " + this.players.find(player => player.username == username))
        }
        /*var hehe = this.players.find(player => player.client = client)
        debug("Client trouvé : " + JSON.stringify(hehe))
        return(hehe)*/
    }

    handle_players(client, data){
        this.find_players(client)
    }
    get_amount_players(){
        return this.players.length()
    }
}

module.exports = Room