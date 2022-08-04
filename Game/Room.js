const { threadId } = require("worker_threads")
const { debug, debugError, playerMessage } = require ("../utils/debug.js")
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
        let player = this.players.find(player => player.id == id)
        if(player){
            player.client = client
            debug("Un joueur déjà existant a été modifié")
        } else {
       		this.players.push(new Player(tag, username, id, client))
        	debug("Un joueur a été créé")
        //this.players[tag] = {username: username, tag: tag, client:client }
    }
        debug(`Tout les joueurs : ${this.players}`)
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
 * @param {int} id
 * @param {WebSocket} client
 * @returns
 */
    find_players(id, client){
        try {
            return this.players.find(player => player.id == id)
        } catch {
            return this.players.find(player => player.client == client)
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
    
    manage_data_to_players(data, id){
        let player_found = this.find_players(id)
        var all_players = this.players.filter(player => player.id !== player_found.id)
        var players_to_send = []
        all_players.forEach(e => players_to_send.push({id:e.id,username: e.username, tag:e.tag, position:e.position}))
        let truc = this.players.find(player => player.id == id).manage_player(data)
        player_found.client.send(Buffer.from(JSON.stringify({self:truc, others:players_to_send})), "utf8")
        //console.log("[TEST] Mec qui doit recevoir : ", player_found.username, "\n", {self:truc, others:players_to_send})
        player_found.set_position()
    }


}

module.exports = Room