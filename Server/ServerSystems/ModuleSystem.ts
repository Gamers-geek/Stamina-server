import { Configuration } from "../../config"
import Logger from "../../utils/logger";
import ErrorSystem from "../../ErrorsAndSuccess/Errors"
import ServerSystem from "../Server";
import path from 'path';
import glob from "glob";
import SuccessSystem from "../../ErrorsAndSuccess/Success";

namespace ModuleSystem {
    export class ModuleLoader {
        static setupModules(){
            if (Configuration.module.allModules.length === 0){
                //Lancer la logique qui va check tout les modules existant et les ajouter à allModules
                const modulefiles = glob.sync(path.resolve("./build/modules/**/main.js").replace(/\\/g, "/"));
                Logger.info(modulefiles)
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
                return new SuccessSystem.OkSuccess("Serveur lancé \n Tout les chemins des modules chargé :" + Configuration.module.allModules)
            } else if(Configuration.module.useModule == true) {
                return new ErrorSystem.ForbidenError("Impossible de trouver des modules, le serveur s'arrête")
            } else {
                return new SuccessSystem.OkSuccess("Serveur Lancé sans module")
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
            Configuration.module.startModules.forEach(modulePath => {
                const module = require(modulePath)
                module.start()
            })
        }
        /**
         * Évènement appelé quand le serveur s'arrête.
         */
        static stopServer():void {
            Configuration.module.stopModules.forEach(modulePath => {
                const module = require(modulePath)
                module.stop()
            })
        }
        /**
         * Évènement appelé quand un client se connecte au serveur. clientData contient les informations de connexion.
         * @param {any} clientData 
         */
        static clientConnexion(clientData:any):void {
            Configuration.module.connectModules.forEach(modulePath => {
                const module = require(modulePath)
                module.connect(clientData)
            })
        }
        /**
         * Évènement appelé quand un client se déconnecte du serveur. clientData contient les informations de déconnexion.
         * @param {any} clientData 
         */
        static clientDeconnexion(clientData:any):void {
            Configuration.module.disconnectModules.forEach(modulePath => {
                const module = require(modulePath)
                module.disconnect(clientData)
            })
        }
        /**
         * Évènement appelé à chaque fois qu'un client envoie des données au serveur. packet contient les données du client en lui-même (pas les données pour les modules spécifiques).
         * @param {any} packet 
         */
        static updateModule(packet:any):void {
            Configuration.module.updateModules.forEach(modulePath => {
                const module = require(modulePath)
                module.update(packet)
            })
        }
        /**
         * Évènement appelé à chaque fois qu'un client envoie des données contenant un paquet pour un module spécifique. moduleData contient le paquet pour le module spécifique.
         * @param {string} moduleName
         * @param {any} moduleData 
         */
        static receiveForModule(moduleName:string, moduleData:any):void {
            Configuration.module.receiveModules.forEach(modulePath => {
                const module = require(modulePath)
                module.receive(moduleData)
            })
        }
        /**
         * Évènement appelé tout les tics physique du serveur +/- 50 fois par secondes
         */
        static serverAdvance():void {
            Configuration.module.advanceModules.forEach(modulePath => {
                const module = require(modulePath)
                module.advance()
            })
        }
        /**
         * Évènement appelé juste avant d'envoyer les données au différent client, permet de modifier les données sortantes pour ajouter les siennes.
         */
        static networkSend():void {
            Configuration.module.sendModules.forEach(modulePath => {
                const module = require(modulePath)
                module.send()
            })
        }
    }
}

export default ModuleSystem