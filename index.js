//Ce fichier ne sert qu'à lancer la logique du serveur et de tout ce qui s'y rapporte et qui ont besoin d'un lancement immédiat.
const Room = require("./Game/Room.js");
const ServerHandling = require("./handling/ServerHandling.js");
const Api = require("./site/Connexion.js");

//Instancie la classe ServerHandling pour pouvoir démarrer le serveur
let server = new ServerHandling("lws-mirror-protocol");
//Lance toute la logique du serveur
server.run();

/*let hehe = new Api()
hehe.run()

hehe.get_games_amount()*/
//hehe.get_players_amount()

/*let lobby = []

function create_lobby(id, players, max_players){
    lobby.push(new Room(id, players, max_players))
}
/*Array.prototype.createlobby = function (){
    this.push(new Room(53, 4, 5))
}
lobby = [] 
lobby.createlobby()*/

/*create_lobby(53, 4, 5)

console.log(lobby)

lobby[0].print_hello()

lobby.find(el=>el.id = 53).print_hello()*/
