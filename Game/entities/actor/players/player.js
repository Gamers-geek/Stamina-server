const { Vector3 } = require("three")

class Player {
    /**
     * Classe du joueur. Elle sert à gérer toute la logique du joueur (position, dégats, actions, niveaux, spells, ...).
     * @param {int} tag 
     * @param {String} username 
     */
    constructor(tag, username){
        this.tag = tag
        this.username = username
        this.oldPosition
    }
/**
 * 
 * @param {Vector3} position 
 * @returns 
 */
    validate_position(position){
        this.oldPosition = position
        return({isPositionValide: true, newPosition:position, oldPosition:this.oldPosition})
  
    }
}

module.exports = Player