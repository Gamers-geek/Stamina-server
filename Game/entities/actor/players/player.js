const { Vector3 } = require("three")

class Player {
    /**
     * Classe du joueur. Elle sert à gérer toute la logique du joueur (position, dégats, actions, niveaux, spells, ...).
     * @param {int} tag 
     * @param {String} username 
     * @param {int} id
     * @param {WebSocket} client
     */
    constructor(tag, username, id, client){
        this.tag = tag
        this.username = username
        this.id = id
        this.client = client
        
        this.oldPosition
        this.position
    }
/**
 * 
 * @param {Vector3} position 
 * @returns 
 */
    validate_position(position){
        this.client.send(Buffer.from(JSON.stringify({isPositionValide: true, newPosition:position, oldPosition:this.oldPosition})), "utf8")
        this.oldPosition = position
    }
}

module.exports = Player