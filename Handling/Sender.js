const { NotFoundError, BadRequestError } = require("../ErrorSystem/Errors")
const { OkSuccess } = require("../ErrorSystem/Success")
const Debug = require("../utils/debug")

class Sender{
    constructor(){
        this.clients = []
        this.version = 0
        this.actualVersion = []
        this.allOldVersion = []
        this.oldVersionsOrder = []
        this.basicDataToSend = {"Players":[], "version":this.version}
    }

    send_data(data){
        //console.log(this.version)
        let dataToSend = this.basicDataToSend
        this.players.forEach(player => {
            //Debug.debug("SIKHGISKHGISKHVGIKSHG")
            //Debug.debug(this.players[0])
            if(player.version == this.version){
                dataToSend.Players = this.actualVersion
                dataToSend.version = this.version
            /*} 
            else if(player.version != this.version){
                player.client.send(Buffer.from(JSON.stringify(new BadRequestError("Version Error"))))*/
            } else {
                let indexPlayer = this.oldVersionsOrder.indexOf(player.version)
                dataToSend.Players.push(this.allOldVersion[indexPlayer])
                player.version ++
            }
            player.client.send(Buffer.from(JSON.stringify(dataToSend), "utf-8"))
        });

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

module.exports = Sender