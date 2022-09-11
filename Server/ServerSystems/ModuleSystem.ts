import { Configuration } from "../../config"
import Logger from "../../utils/logger";
import ErrorSystem from "../../ErrorsAndSuccess/Errors"
import ServerSystem from "../Server";
import path from 'path';
import glob from "glob";

namespace ModuleSystem {
    export class ModuleLoader {
        static setupModules(){
            if (Configuration.module.allModules.length === 0){
                //Lancer la logique qui va check tout les modules existant et les ajouter à allModules
                const modulefiles = glob.sync(path.resolve("./build/modules/**/main.js").replace(/\\/g, "/"));
                console.log(modulefiles)
                modulefiles.forEach(modulePath => {
                    const module = require(modulePath)
                    console.log(module)
                    Configuration.module.allModules.push(modulePath)
                    if(module.start) {
                        Configuration.module.startModules.push(modulePath)
                    }
                    if(module.connect) {
                        Configuration.module.connectModules.push(modulePath)
                    }
                    if(module.disconnect) {
                        Configuration.module.disconnectModules.push(modulePath)
                    }
                    if(module.send) {
                        Configuration.module.sendModules.push(modulePath)
                    }
                    if(module.advance) {
                        Configuration.module.advanceModules.push(modulePath)
                    }
                    if(module.update) {
                        Configuration.module.updateModules.push(modulePath)
                    }
                    if(module.receive) {
                        Configuration.module.receiveModules.push(modulePath)
                    }
                    if(module.stop) {
                        Configuration.module.stopModules.push(modulePath)
                    }
                })
                Logger.info(Configuration.module)
            }
        }
        static refresh(){

        }
    }
    export class ModuleEvent{
        /**
         * Évènement appelé quand le serveur démarre.
         */
        static startServer():void {

        }
        /**
         * Évènement appelé quand le serveur s'arrête.
         */
        static stopServer():void {

        }
        /**
         * Évènement appelé quand un client se connecte au serveur. clientData contient les informations de connexion.
         * @param {any} clientData 
         */
        static clientConnexion(clientData:any):void {

        }
        /**
         * Évènement appelé quand un client se déconnecte du serveur. clientData contient les informations de déconnexion.
         * @param {any} clientData 
         */
        static clientDeconnexion(clientData:any):void {

        }
        /**
         * Évènement appelé à chaque fois qu'un client envoie des données au serveur. packet contient les données du client en lui-même (pas les données pour les modules spécifiques).
         * @param {any} packet 
         */
        static updateModule(packet:any):void {

        }
        /**
         * Évènement appelé à chaque fois qu'un client envoie des données contenant un paquet pour un module spécifique. moduleData contient le paquet pour le module spécifique.
         * @param {any} moduleData 
         */
        static receiveForModule(moduleData:any):void {

        }
        /**
         * Évènement appelé tout les tics physique du serveur +/- 50 fois par secondes
         */
        static serverAdvance():void {

        }
        /**
         * Évènement appelé juste avant d'envoyer les données au différent client, permet de modifier les données sortantes pour ajouter les siennes.
         */
        static networkSend():void {

        }
    }
}

export default ModuleSystem