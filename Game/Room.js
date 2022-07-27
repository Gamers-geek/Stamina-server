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
 * @returns id of the class
 */
    get_id(){
        return this.id
    }
    
    print_hello(){
        debug("Hello World")
    }
/**
 * @param {int} tag 
 * @param {String} username
 * Instancie une nouvelle classe Player qui s'occupera de gérer la logique d'un joueur défini par son id et username
 */
    create_players(tag, username, client){
        this.players.push(new Player(tag, username, client))
        //this.players[tag] = {username: username, tag: tag, client:client }
        debug(this.players)
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
}

module.exports = Room