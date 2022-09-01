const { BadRequestError } = require("../ErrorSystem/Errors")
const { OkSuccess } = require("../ErrorSystem/Success")
const THREE = require("three")
const DataBase = require("../Database/DataBase")
const PLAYER_STATUS = Object.freeze({
    IDLING: 0,
	WALKING: 1,
	RUNNING: 2,
	CLIMBING: 3,
	ATTACKING: 4,
	FALLING: 5,
	JUMPING: 6,
	CROUCHING: 7
})

/**
 * Joueur in game, elle s'occupe de gérer et de valider les différentes actions du joueur.
 */
class Players {
    /**
     * @param {THREE.Vector3} position 
     * @param {radiant} rotation 
     * @param {String} username 
     * @param {Number} tag 
     * @param {Number} id 
     * @param {WebSocket.client} client 
     * @param {Number} version 
     */
    constructor(position, rotation, username, tag, id, client, version){
        this.position = new THREE.Vector3(position.x, position.y, position.z)
        this.rotation = rotation,
        this.username = username,
        this.tag = tag,
        this.id = id,
        this.client = client
        this.playerStatut = PLAYER_STATUS.IDLING
        this.oldPosition
        this.version = version
    }

    validatePosition(newPosition, newRotation){
        try {
            this.oldPosition = this.position
            this.position.x = newPosition.x
            this.position.z = newPosition.z
            this.position.y = newPosition.y
            this.rotation = newRotation
            return new OkSuccess({position:this.position, rotation:this.rotation})
        } catch {
            return new BadRequestError("Imposibilité de retourner la position et la rotation du joueur")
        }
    }

    managePlayer(data){
        try{
            if(this.playerStatut != data.PlayerId.Player.PlayerStatut){
                if(this.sender.version == this.version){
                    this.sender.createNewVersion()
                    this.version++
                } else{
                    this.sender.createNewVersion()
                    this.sender.sendMissingPackets(this.sender.version - this.version, this.client)
                }
            }
            this.validatePosition(data.PlayerID.Player.Position, data.PlayerID.Player.Rotation)
            return new OkSuccess(this, "Joueur " + this.username)
        } catch {
            return new BadRequestError("Imposibilité de faire fonctionner le joueur")
        }
    }

    getAllPackets(){
        let dataToSend = DataBase.getAllPackets()
        console.log(dataToSend)
    }

}

module.exports = Players