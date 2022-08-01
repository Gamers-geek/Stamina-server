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
        const player = this.players.find(player => player.id = id)
        if(player){
            player.client = client
            debug("Un joueur déjà existant a été modifié")
        } else {
        this.players.push(new Player(tag, username, id, client))
        debug("Un joueur a été créé")
        //this.players[tag] = {username: username, tag: tag, client:client }
    }
        debug(`Tout les joueurs : ${this.players})`)
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
            return this.players.find(player => player.id = id)
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
    test_players_positions(){
        this.players.forEach(player => {
            console.log("[TEST] ", player)
        })
    }
    
    manage_data_to_players(data, id){
        var player = this.find_players(id)
        var all_players = this.players.filter(player => player.id !== id)
        var players_to_send = []
        for(var i = 0; i < all_players.length; i++){
            players_to_send.push({id:all_players[i].id,position:all_players[i].position, username:all_players[i].username, tag:all_players[i].tag})
        }
        console.log(players_to_send)
        player.client.send(Buffer.from(JSON.stringify({self:player.manage_player(data)/*, others:players_to_send*/}),"utf-8"))
        player.set_position()
    }

}

module.exports = Room