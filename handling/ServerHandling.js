const { Server, WebSocket } = require("ws");
const { port, maxPlayer } = require("../config.js");
const Room = require("../Game/Room");
const { debug, debugError } = require("../utils/debug.js");
const DataHandling = require("./DataHandling.js");

/**
 * @class ServerHandling
 * @classdesc Classe du serveur. Gère les connexion, déconnexion et écoute les données envoyés par les clients.
 * Les données reçues sont envoyés à la classe DataHandling, qui envoie les informations aux parties dédiées
 */
class ServerHandling {
	/**
	 * @param {String} protocol
	 */
	constructor(protocol = null) {
		this.protocol = protocol;
		this.players;
		this.dataHandling = new DataHandling();
		this.lobby = [];
	}

	/**
	 * @function run
	 * @returns {void}
	 * @description La fonction lance le serveur et écoute quand quelqu'un se connecte.
	 *     - Si quelqu'un se connecte, elle appelle on_connect().
	 *     - Si quelqu'un se déconnecte, elle appelle on_disconnect().
	 */
	run() {
		this.players = "0";

		const server = new Server({ port: port, proto: this.protocol });

		debug(`Server started on port ${port} !`);
		debug("Nombre des joueurs : " + this.players);
		this.dataHandling.create_lobby(1, 100);
		server.on("connection", (client) => {
			this.on_connect(client, server);
			debug("Nombre de joueurs : " + this.players);

			if (this.players > maxPlayer) {
				this.dataHandling.send_data(
					client,
					{ error: "Too many player connected" },
					Date.now()
				);
				client.close();
				/*this.dataHandling.create_lobby(15, 25)
            this.dataHandling.create_player(25, "Cardiaque", client)*/
			}

			client.on("close", (code, reason) => {
				this.on_disconnect(code, reason);
			});
		});
	}

	/**
	 * @function on_disconnect
	 * @description Quand un client se déconnecte, la fonction récupère le code et la raison de la déconnexion. Il change aussi le nombre de personnes connectés dans la partie (-1).
	 * @param {String} code
	 * @param {String} reason
	 * @returns {void}
	 */
	on_disconnect(code, reason) {
		this.players = -1;
		debug(
			`Connexion closed with code: ${code}, raison: ${
				reason.toString() ? reason.toString() : "Aucune"
			}`
		);
		this.dataHandling.delete_player();
	}

	/**
	 * @function on_connect
	 * @description Quand un joueur se connecte, la fonction récupère l'ID et les informations du client et
	 *     les envoie dans le DataHandler. Ce dernier s'occupe d'envoyer les informations aux bons endroits.
	 *     Il change également le nombre de personnes connectés dans la partie (+1)
	 * @param {WebSocket} client
	 * @param {Server} server
	 * @returns {void}
	 */
	on_connect(client, server) {
		this.players++;
		debug(
			`Une personne vient de se connecter, ID : ${JSON.stringify(client[0])}`
		);
		debug(`Nombre de clients : ${server.clients.size}`);

		client.on("message", (message) => {
			try {
				this.dataHandling.use_data(client, message, Date.now());
				//console.log("Nouveau message")
			} catch (error) {
				debugError(error);
			}
		});
	}
	/**
	 * @function get_amount_players
	 * @description Permet de connaitre le nombre de joueurs connecté sur le serveur.
	 * @returns {number}
	 */
	get_amount_players() {
		return this.players;
	}

	/**
	 * @function get_amount_games
	 * @description Permet de connaitre le nombre de parties en cours sur ce serveur.
	 * @returns {number}
	 */
	get_amount_games() {
		return this.lobby.length();
	}

	/**
	 * @function join_game
	 * @todo Coder la fonction
	 * @description [Fonction non implémentée]
	 */
	join_game() {}

	/**
	 * @function leave_game
	 * @todo Coder la fonction
	 * @description [Fonction non implémentée]
	 * @param {number} playerID
	 */
	leave_game(playerID) {}

	/**
	 * @function delete_game
	 * @todo Coder la fonction
	 * @description [Fonction non implémentée]
	 */
	delete_game() {}
}

module.exports = ServerHandling;
