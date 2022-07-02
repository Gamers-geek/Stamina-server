const {debug, debugError} = require("../utils/debug");


class Room {
    /** 
     * 
     * @param {int} id 
     * @param {Array} players 
     */
    constructor(id, players){
        this.id = id
        this.players = players

    }
/**
 * @returns id of the class
 */
    get id(){
        return this.id
    }
}

module.exports = {Room}