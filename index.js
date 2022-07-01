//Ce fichier ne sert qu'à lancer la logique du serveur et de tout ce qui s'y rapporte et qui ont besoin d'un lancement immédiat.

const {ServerHandling} = require("./handling/ServerHandling.js");


//Instancie la classe ServerHandling pour pouvoir démarrer le serveur
var test = new ServerHandling()

//Lance toute la logique du serveur
test.run()


/*
/**
 * @param {JSON} message 
 * @param {Server<WebSocket>} socket 
 * @param {String} method 
 * @param {WebSocket} client 
 * @returns {Function} 
 */
/*function handleMethod(message, socket, method, client) {
    // Si la méthode n'existe pas, on retourne une erreur
    if (!methods[method]) {
        
        debug(`Quelqu'un a voulu utiliser la fonction "${method}" qui n'existe pas.`)
        
        return client.send(JSON.stringify({
            error: 400
        }))

    }
    return methods[method].run(message, socket, client)
}*/