const {debug, debugError} = require("../utils/debug");
const {Serveur} = require("./ServerHandling");

//le système de date est obligatoire, car il permettra de mettre en place le systeme de ping et le systeme de pertes des paquets.µ
// Si un paquet est trop vieux on pourra le considérer comme inutile

class DataHandling {

    constructor(){
        
    }

//Cette fonction renverra les données au client concernées, peu importe le type de données. 
//Elle pourra être utilisée partout, car son unique but est de renvoyer des données.
//Plus tard, il y aura un cryptage des données pour éviter tout problème.
/**
 * @param {WebSocket} client
 * @param {String} data
 * @param {int} date
 */
    send_data(client, data, date){
        client.send(JSON.stringify({data, date}))
    }


//Cette fonction s'occupera de partager les différentes données envoyées du client au serveur vers les "services compétents".
//La position sera par exemple envoyées vers la classe Player et sa fonction ValidatePosition() qui elle renverra au client si la position est valide ou non.
//Elle fonctionne avec une boucle for car plusieurs données utiles sont envoyées dans un seul JSON
/**
 * @param {WebSocket} client
 * @param {String} data
 * @param {int} date
 */
    use_data(client, data, date){
        let hehe = data.toString()
        let parsedMessage = JSON.parse(hehe);
        if (!parsedMessage) {
            return debugError("Invalid message format", message);
        };

        debug(`Nouveau message ${parsedMessage} \n Envoyé à : ${date} \n Envoyé par : ${JSON.stringify(client)}`)
    }
}

module.exports = {DataHandling};