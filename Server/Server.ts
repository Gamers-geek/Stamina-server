
import NetworkSystem from "./ServerSystems/NetworkManager"
import { Configuration } from "../config"
import Logger from "../utils/logger"
import { Player } from "../Player/Player"

namespace ServerSystem {

    interface IPlayer {
        id:number;
        username:string;
        PlayerRotation:number;
        PlayerPosition:{
            x:number;
            y:number;
            z:number;
        }
        tag:number;
    }
    export class Node {

        static players: Array<Player> = []

        static start(){
            NetworkSystem.EventHandler.launch()
            Node.runLogic()
        }
        /**
         * Lance la logique du serveur avec une boucle while
         */
        static async runLogic() {
            //À refaire en partie pour prendre en compte le petit temps que prend la promise pour s'exécuter 
            //pour être sur que ce soit à chaque fois 20 millième de secondes et pas un de plus !
            Logger.info("Démarrage de la logique ...");
            let eachTics = 1000/Configuration.server.physicTic;
            Logger.debug(eachTics)
            while (Configuration.server.runServer == true) {
                let startWork = Date.now()
                Node.players.forEach(player => {
                    Logger.debug(player.position)
                });
                await NetworkSystem.PackageManager.sendPackages()
                let endWork = Date.now() - startWork
                await new Promise(resolve => setTimeout(resolve, eachTics - endWork));
            }
        }

        /**
         * Fonction pour pouvoir créer une nouvelle instance de joueur sur le serveur.
         * @param {IPlayer} newPlayer 
         */
        static addPlayer(newPlayer:IPlayer, playerClient:any) {
            let player:any = Node.players.find(player => player.ID == newPlayer.id);
            if(player) {
                player.client = playerClient;
                Logger.info("Modified an existing player : " + player.username)
            }
            else {
                Node.players.push(
                    new Player(
                        newPlayer.username,
                        newPlayer.tag,
                        newPlayer.id,
                        playerClient
                    )
                );
                Logger.info("New Player : " + newPlayer.username)
            }
        }

        /**
         * Fonction pour retirer et déconnecter un joueur du serveur.
         * @param {string} removedPlayer 
         */
        static removePlayer(removedPlayer:number) {
            Logger.debug(removedPlayer)
            Logger.debug(Node.players)
            let playerToRemove:any = Node.players.find(player => player.ID == removedPlayer)
            let indexOfPlayerToRemove:number = Node.players.indexOf(playerToRemove)
            playerToRemove.client.close()
            Node.players.splice(indexOfPlayerToRemove)
            
        }

        /**
         * Retourne l'instance du joueur qui contient l'id demandé
         * @param {number} playerID
         * @returns
         */
        static getPlayerById(playerID:number):Player {
            let player:any = Node.players.find(player => player.ID == playerID)
            return player
        }

        /**
         * Retourne l'instance du joueur qui contient le nom demandé
         * @param {string} playerName 
         * @returns 
         */
        static gePlayerByUsername(playerName:string):Player {
            let player:any = Node.players.find(player => player.username = playerName)
            return player
        }

        static updatePlayer(playerID:number, playerPosition:any, playerRotation:number) {
            let player = Node.getPlayerById(playerID)
            if(player) {
                player.validatePosition(playerPosition, playerRotation)
            } else {
                Logger.debug("The player don't exist ;-;")
            }
        }
        /**
         * À faire !
         */
        static restart(){
            //Add some code...
        }

        /**
         * À faire !
         */
        static stop(){
            //Add some code...
        }
    }
}

export default ServerSystem