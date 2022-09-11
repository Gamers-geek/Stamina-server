import { Vector3 } from 'three'
import { Player } from '../../Player/Player'
import ErrorSystem from "../../ErrorsAndSuccess/Errors"
import SuccessSystem from "../../ErrorsAndSuccess/Success"

interface typeDataToSend {
    Players: Array<smallPlayer>,
    version: number,
    Data: Array<data>,
}

type dataEvent = ""

interface data {
    type: dataEvent,
    player: number
}

interface smallPlayer {
    position: Vector3,
    rotation: number
}

namespace NetworkSystem{
    export class PackageManager {
        static version: number = 0
        static actualVersion: Array<any>
        static allOldVersion: Array<any>
        static oldVersionsOrder: Array<any>
        static players: any
        /**
         * 
         * @param {Array} allPlayers 
         */
        static sendPackages(allPlayers: Array<Player>): void {
            //console.log(allPlayers)
            let dataToSend: typeDataToSend = { Players: [], version: PackageManager.version, Data: [] }
            /*if(data){
                dataToSend.Data = data
            }*/
            allPlayers.forEach((player, index) => {
                let somethingToSend = dataToSend.Players.splice(index)
                dataToSend.Players.push({ position: player.position, rotation: player.rotation })
                player.client.send(Buffer.from(JSON.stringify(somethingToSend), "utf-8"))
            })
            //Debug.debug(dataToSend)
            dataToSend = { "Players": [], "version": this.version, "Data": [] }
        }

        static addClient(clientToAdd: any) {
            console.log("YO !")
            try {
                PackageManager.players.push(clientToAdd)
                PackageManager.allOldVersion.push(PackageManager.actualVersion)
                PackageManager.oldVersionsOrder.push(PackageManager.version)
                PackageManager.version++
                return new SuccessSystem.OkSuccess(clientToAdd, "Le joueur a été rajouté avec succès")
            } catch {
                return new ErrorSystem.BadRequestError("Impossible de rajouter un joueur")
            }
        }

        static removeClient(clientToRemove: any) {
            try {
                let remove = PackageManager.players.find((player: any) => player == clientToRemove)
                PackageManager.players.splice(remove)
                PackageManager.allOldVersion.push(PackageManager.actualVersion)
                PackageManager.oldVersionsOrder.push(PackageManager.version)
                PackageManager.version++
                return new SuccessSystem.OkSuccess(clientToRemove, "Le joueur a été retiré avec succès")
            } catch {
                return new ErrorSystem.NotFoundError("Le joueur que vous essayez de retirer n'existe pas")
            }
        }

        static createNewVersion() {
            try {
                PackageManager.allOldVersion.push(PackageManager.actualVersion)
                PackageManager.oldVersionsOrder.push(PackageManager.version)
                PackageManager.version++
                return new SuccessSystem.OkSuccess(PackageManager.version, "Nouvelle version créé avec succès")
            } catch {
                return new ErrorSystem.BadRequestError("Impossible de créer une nouvelle version")
            }
        }
        /**
         * @param {Array} allMissingVersions
         * @param {Players.name} player
         */
        static sendMissingPackets(allMissingVersions: any, player: any) {

        }

    }

    export class EventHandler {

    }
}

export default NetworkSystem