const {debug, debugError} = require("../utils/debug");
const ServerHandling = require("./ServerHandling");
const methods = require("../handler")

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
        let parsedMessage = JSON.parse(StringMessage);
        if (!parsedMessage) {
            return debugError("Invalid message format", message);
        };
        if(parsedMessage["client_type"] == "client"){
            this.handle_data_for_clients(client, parsedMessage)
        }
        else if(parsedMessage["client_type"] == "api"){
            this.handle_data_for_api(parsedMessage, client, parsedMessage.method)
        }
        else if(parsedMessage["client_type"] == "admin"){
            this.handle_data_for_admin(client)
        }
        console.log(`[DEBUG]  Nouveau message`, parsedMessage,` \n Envoyé à : ${date}\n Types de demandes : ${parsedMessage.client_type}`)
        // \n Envoyé par : ${JSON.stringify(client)} 
    }
/**
 * 
 */
    handle_data_for_clients(client, data){
        debug("Un client a envoyé une requête")
    }

    handle_data_for_api(message, client, method){
        if (!methods[method])  {
            debug(`Quelqu'un à voulu utiliser la fonction "${method}" qui n'existe pas.`)
            return client.send(JSON.stringify({
                error: 400
            })) // si méthod n'existe pas, renvoyer le code 400
    
        }
    
        methods[method].run(message, client)
    }

    handle_data_for_admin(client, data, method){
        debug("Un admin a envoyé une requête")
    }
}

module.exports = DataHandling;