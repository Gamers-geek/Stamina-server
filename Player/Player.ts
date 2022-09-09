import { ErrorSystem } from "../ErrorsAndSuccess/Errors";
import BadRequestError = ErrorSystem.BadRequestError
import { SuccessSystem } from "../ErrorsAndSuccess/Success";
import OkSuccess = SuccessSystem.OkSuccess
import {Vector3} from "three";
import { DataBase } from "../Database/Database";
import Websocket from "ws";

enum PLAYER_STATUS{
    IDLING,
	WALKING,
	RUNNING,
	CLIMBIN,
	ATTACKING,
	FALLING,
	JUMPING,
	CROUCHING
};

/**
 * Joueur in game, elle s'occupe de gérer et de valider les différentes actions du joueur.
 */    
interface PlayerNewPosition {
    x:number;
    y:number;
    z:number
}

interface PlayerManage{
    PlayerID:{
        Player:{
            PlayerStatut:number;
            Rotation:number;
            Position:PlayerNewPosition
        }
    }
}

export class Players {
    position:Vector3;
    rotation:number;
    username:String;
    tag:number;
    ID:number;
    version:number;
    playerStatut:number;
    oldPosition: Vector3;
    client:Websocket
    constructor(position:THREE.Vector3, rotation:number, username:String, tag:number, id:number, version:number, client:Websocket){
        this.position = new Vector3(position.x, position.y, position.z)
        this.rotation = rotation,
        this.username = username,
        this.tag = tag,
        this.ID = id,
        this.playerStatut = PLAYER_STATUS.IDLING
        this.oldPosition = position
        this.version = version
        this.client = client
    }
    
    validatePosition(newPosition:PlayerNewPosition, newRotation:number): SuccessSystem.OkSuccess | ErrorSystem.BadRequestError{
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

    /**
     * Fonction à refaire entièrement, le systeme de "sender" a été refait.
     */
    managePlayer(data:PlayerManage): SuccessSystem.OkSuccess | ErrorSystem.BadRequestError{
        try{
/*            if(this.playerStatut != data.PlayerID.Player.PlayerStatut){
                if(this.sender.version == this.version){
                    this.sender.createNewVersion()
                    this.version++
                } else{
                    this.sender.createNewVersion()
                    this.sender.sendMissingPackets(this.sender.version - this.version)
                }
            }*/
            this.validatePosition(data.PlayerID.Player.Position, data.PlayerID.Player.Rotation)
            return new OkSuccess(this, "Joueur " + this.username)
        } catch {
            return new BadRequestError("Imposibilité de faire fonctionner le joueur")
        }
    }

    /**getAllPackets(){
        let dataToSend = DataBase.getAllPackets()
        console.log(dataToSend)
    }*/

}