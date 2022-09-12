const priority = "high"

//Toutes les fonctions ne sont pas obligatoires, veuillez ne mettre dans ce fichier que les fonctions dont vous avez besoin pour votre module.
/**
* Fonction appelée au démarrage du serveur, permet de lancer les premiers systèmes du module si besoin
*/
export function start():void {

}
/**
 * Fonction appelée lors de l'extinction ou du redémarrage, permet de faire des sauvegardes de l'état de votre modules
 */
export function stop():void {

}
/**
* @param {any} packet 
* Fonction appelée à chaque fois qu'un joueur envoie une donnée. packet est l'entierté de ce que le joueur a envoyé, à l'exception des données de modules.
*/
export function update(packet:any):void {
    
}
/**
 * @param {any} data
 * Fonction appelée à chaque fois que quelqu'un se connecte au serveur WebSocket. data est les informations de connexion.
 */
export function connect(data:any):void {

}
/**
 * @param {any} data 
 * Fonction appelée à chaque fois que quelqu'un se déconnecte du serveur WebSocket. data est les information de déconnexion.
 */
export function disconnect(data:any):void {

}
/**
* Fonction appelée à chaque tic physique du serveur
*/
export function advance():void {
    
}
/**
* @param {any} data 
* Fonction appelée à chaque fois qu'un joueur appelle un module dans ses paquets. data contient les données du module du paquet du joueur
*/
export function receive(data:any):void {
    
}
/**
* Fonction appelée avant d'envoyer ttes les données aux joueurs, pour permettre de rajouter si besoin est des donneés à envoyer.
*/
export function send():void {
    
}