import { ErrorSystem } from "../../ErrorsAndSuccess/Errors"
import { SuccessSystem } from "../../ErrorsAndSuccess/Success"
import NotFoundError = ErrorSystem.NotFoundError
import BadRequestError = ErrorSystem.BadRequestError
import OkSuccess = SuccessSystem.OkSuccess
import { Player } from "../../Player/Player"
import Debug from "../../utils/logger"
import { Vector3 } from "three"

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

/**
 * Système qui s'occupe de gérer les données à envoyer aux différents utilisateurs. C'est lui qui s'occupe de maintenir les utilisateurs à jour
 * Et de sauvegarder les différentes versions de paquets pour savoir quoi en faire.
 */
namespace PacketSystem {
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
                return new OkSuccess(clientToAdd, "Le joueur a été rajouté avec succès")
            } catch {
                return new BadRequestError("Impossible de rajouter un joueur")
            }
        }

        static removeClient(clientToRemove: any) {
            try {
                let remove = PackageManager.players.find((player: any) => player == clientToRemove)
                PackageManager.players.splice(remove)
                PackageManager.allOldVersion.push(PackageManager.actualVersion)
                PackageManager.oldVersionsOrder.push(PackageManager.version)
                PackageManager.version++
                return new OkSuccess(clientToRemove, "Le joueur a été retiré avec succès")
            } catch {
                return new NotFoundError("Le joueur que vous essayez de retirer n'existe pas")
            }
        }

        static createNewVersion() {
            try {
                PackageManager.allOldVersion.push(PackageManager.actualVersion)
                PackageManager.oldVersionsOrder.push(PackageManager.version)
                PackageManager.version++
                return new OkSuccess(PackageManager.version, "Nouvelle version créé avec succès")
            } catch {
                return new BadRequestError("Impossible de créer une nouvelle version")
            }
        }
        /**
         * @param {Array} allMissingVersions
         * @param {Players.name} player
         */
        static sendMissingPackets(allMissingVersions: any, player: any) {

        }

    }
}

export default PacketSystem