const { Vector3 } = require("three")
const { playerMessage } = require("../../../../utils/debug")

class Player {
    /**
     * Classe du joueur. Elle sert à gérer toute la logique du joueur (position, dégats, actions, niveaux, spells, ...).
     * @param {int} tag 
     * @param {String} username 
     * @param {int} id
     * @param {WebSocket} client
     * @param {Vector3} position
     */
    constructor(tag, username, id, client, position, rotation){
        this.tag = tag
        this.username = username
        this.id = id
        this.client = client
        this.position = position
        this.rotation = rotation
        this.oldPosition
    }
/**
 * @param {Vector3} position 
 * @returns 
 */
    validate_player_actions(position, rotation){
        this.rotation = rotation
        this.position = position
        playerMessage(`Position actuelle de ${this.username}#${this.tag} : ${this.position}`)
        playerMessage(`Ancienne position de ${this.username}#${this.tag} : ${this.oldPosition}`)
        return ({isPositionValid: true, newPosition:position, oldPosition:this.oldPosition})
    }
    
    set_position(){
        this.oldPosition = this.position
    }

    manage_player(data){
        //this.client.send(Buffer.from(JSON.stringify({position:this.validate_position(data.PlayerID.Player.Position)}), "utf-8"))
        return ({position:this.validate_player_actions(data.PlayerID.Player.Position, data.PlayerID.Player.Rotation)})
    }
}

module.exports = Player