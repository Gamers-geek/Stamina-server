const {debug, debugError} = require("../utils/debug");


class Room {
    /** 
     * 
     * @param {int} id 
     * @param {Array} players 
     * @param {int} max_players
     */
    constructor(id, players, max_players){
        this.id = id
        this.players = players
        this.max_players = max_players

    }
/**
 * @returns id of the class
 */
    get_id(){
        return this.id
    }
    
    static print_hello(){
        console.log("Hello World")
    }
}

module.exports = {Room}