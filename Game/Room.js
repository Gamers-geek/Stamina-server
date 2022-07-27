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
        this.connectedClients = {}
    }
/**
 * @returns id of the class
 */
    get_id(){
        return this.id
    }
    
    print_hello(){
        console.log("Hello World")
    }
/**
 * @param {int} id 
 * @param {String} username
 * Instancie une nouvelle classe Player qui s'occupera de gérer la logique d'un joueur défini par son id et username
 */
    create_players(id, username, client){
        this.players.push(new Player(id, username))
        this.connectedClients[id] = {name: username, id: id, client:client }
    }
/**
 * @param {*} id 
 * @param {*} username 
 * @return socket
 */
    find_players(id, username){
        try {
            console.log("Trouvé via l'id : " + JSON.stringify(this.players.find(player=>player.id = id)))
        } catch {
            console.log("Trouvé via le pseudo : " + JSON.stringify(this.players.find(player => player.username = username)))
        }
    }
}

module.exports = Room