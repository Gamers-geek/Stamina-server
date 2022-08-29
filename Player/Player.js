const { BadRequestError } = require("../ErrorSystem/Errors")
const { OkSuccess } = require("../ErrorSystem/Success")
const THREE = require("three")
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


class Players {
    constructor(position, rotation, username, tag, id, client, sender, version){
        this.position = new THREE.Vector3(position.x, position.y, position.z)
        this.rotation = rotation,
        this.username = username,
        this.tag = tag,
        this.id = id,
        this.client = client
        this.playerStatut = PLAYER_STATUS.IDLING
        this.oldPosition
        this.sender = sender
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
        let dataToSend = {"Players": this.sender.players, "version": this.sender.version}
        this.client.send(Buffer.from(JSON.stringify(dataToSend), "utf-8"))
        this.version = this.sender.version
    }

}

module.exports = Players