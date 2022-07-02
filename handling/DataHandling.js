const {debug, debugError} = require("../utils/debug");

// Le système de date est obligatoire, car il permettra de mettre en place le systeme de ping et le systeme de pertes des paquets.µ
// Si un paquet est trop vieux on pourra le considérer comme inutile

class DataHandling {

    constructor(){
        
    }

/**
 * Cette fonction renverra les données au client concernées, peu importe le type de données.
 * Elle pourra être utilisée partout, car son unique but est de renvoyer des données.
 * Plus tard, il y aura un cryptage des données pour éviter tout problème.
 * @param {WebSocket} client
 * @param {String} data
 * @param {int} date
 */
    send_data(client, data, date){
        client.send(JSON.stringify({data, date}))
    }

/**
 * Cette fonction s'occupera de partager les différentes données envoyées du client au serveur vers les "services compétents".
 * La position sera par exemple envoyées vers la classe Player et sa fonction ValidatePosition() qui elle renverra au client si la position est valide ou non.
 * Elle fonctionne avec une boucle for car plusieurs données utiles sont envoyées dans un seul JSON
 * @param {WebSocket} client
 * @param {String} data
 * @param {int} date
 */
    use_data(client, data, date){
        let StringMessage = data.toString()
        let test = JSON.stringify(StringMessage)
        let parsedMessage = JSON.parse(test);
        if (!parsedMessage) {
            return debugError("Invalid message format", message);
        };
        if(parsedMessage["client_type"] == "client"){
            this.handle_data_for_clients(client, parsedMessage)
            debug("Un client a envoyé une requète")
        }
        debug(`Nouveau message ${parsedMessage} \n Envoyé à : ${date}\n Types de demandes : ${parsedMessage["client_type"]}`)
        // \n Envoyé par : ${JSON.stringify(client)} 
    }
/**
 * 
 */
    handle_data_for_clients(client, data){

    }
}

module.exports = {DataHandling};