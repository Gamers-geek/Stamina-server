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
    constructor(tag, username, id, client, position) {
        this.tag = tag
        this.username = username
        this.id = id
        this.client = client
        this.position = position
        this.oldPosition
    }
    /**
     * @function validate_position
     * @description Vérifie que la position du joueur est valide.
     * @param {Vector3} position 
     * @returns {JSON}
     */
    validate_position(position) {
        this.position = position
        playerMessage(`Position actuelle de ${this.username}#${this.tag} : ${this.position}`)
        playerMessage(`Ancienne position de ${this.username}#${this.tag} : ${this.oldPosition}`)
        return ({ isPositionValid: true, newPosition: position, oldPosition: this.oldPosition })
    }

    /**
     * @function set_position
     * @description Définit la nouvelle position du joueur.
     */
    set_position() {
        this.oldPosition = this.position
    }

    /**
     * @function manage_player
     * @param {JSON} data 
     * @returns {JSON}
     */
    manage_player(data) {
        //this.client.send(Buffer.from(JSON.stringify({position:this.validate_position(data.PlayerID.Player.Position)}), "utf-8"))
        return ({ position: this.validate_position(data.PlayerID.Player.Position) })
    }
}

module.exports = Player