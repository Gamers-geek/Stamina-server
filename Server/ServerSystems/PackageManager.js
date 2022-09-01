const { NotFoundError, BadRequestError } = require("../../ErrorSystem/Errors")
const { OkSuccess } = require("../../ErrorSystem/Success")
const Debug = require("../../utils/debug")

/**
 * Système qui s'occupe de gérer les données à envoyer aux différents utilisateurs. C'est lui qui s'occupe de maintenir les utilisateurs à jour
 * Et de sauvegarder les différentes versions de paquets pour savoir quoi en faire.
 */
class PackageManager{
    constructor(){
        this.clients = []
        this.version = 0
        this.actualVersion = []
        this.allOldVersion = []
        this.oldVersionsOrder = []
    }
/**
 * 
 * @param {Array} allPlayers 
 * @param {Array} data 
 */
    sendPackages(allPlayers, data=null){
        //console.log(allPlayers)
        let dataToSend = {"Players":[], "version":this.version, "Data":[]}
        if(data){
            dataToSend.Data = data
        }
        allPlayers.forEach((player, index) => {
            let somethingToSend = dataToSend.Players.splice(index)
            dataToSend.Players.push({"position" : player.position, "rotation" : player.rotation})
            player.client.send(Buffer.from(JSON.stringify(somethingToSend),"utf-8"))
        })
        Debug.debug(dataToSend)
        dataToSend = {"Players":[], "version":this.version, "Data":[]}
    }

    addClient(clientToAdd){
        console.log("YO !")
        try{
            this.players.push(clientToAdd)
            this.allOldVersion.push(this.actualVersion)
            this.oldVersionsOrder.push(this.version)
            this.version ++
            return new OkSuccess(clientToAdd, "Le joueur a été rajouté avec succès")
        } catch {
            return new BadRequestError("Impossible de rajouter un joueur")
        }
    }

    removeClient(clientToRemove){
        try{
            let remove = this.players.find(player => player == clientToRemove)
            this.players.splice(remove)
            this.allOldVersion.push(this.actualVersion)
            this.oldVersionsOrder.push(this.version)
            this.version ++
            return new OkSuccess(clientToRemove, "Le joueur a été retiré avec succès")
        } catch {
            return new NotFoundError("Le joueur que vous essayez de retirer n'existe pas")
        }
    }

    createNewVersion(){
        try{
            this.allOldVersion.push(this.actualVersion)
            this.oldVersionsOrder.push(this.version)
            this.version++
            return new OkSuccess(this.version, "Nouvelle version créé avec succès")
        } catch {
            return new BadRequestError("Impossible de créer une nouvelle version")
        }
    }

    sendMissingPackets(amountOfMissingVersions, player){
        amountOfVersions = this.oldVersionsOrder.length()
        missingsPackets = []
        for(let i = amountOfVersions - amountOfMissingVersions; i < amountOfVersions; i++){
            missingsPackets.push(this.allOldVersion[i])
        }
        player.client.send(missingsPackets)
        player.version = this.version

    }

}

module.exports = PackageManager