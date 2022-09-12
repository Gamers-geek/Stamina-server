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
                    Configuration.module.allModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    if(module.start) {
                        Configuration.module.startModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    }
                    if(module.connect) {
                        Configuration.module.connectModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    }
                    if(module.disconnect) {
                        Configuration.module.disconnectModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    }
                    if(module.send) {
                        Configuration.module.sendModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    }
                    if(module.advance) {
                        Configuration.module.advanceModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    }
                    if(module.update) {
                        Configuration.module.updateModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    }
                    if(module.receive) {
                        Configuration.module.receiveModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    }
                    if(module.stop) {
                        Configuration.module.stopModules.push({moduleName:ModuleLoader.getModuleName(modulePath), pathToModule:modulePath})
                    }
                })
                Logger.info(Configuration.module)
                return new SuccessSystem.OkSuccess("Serveur lancé \n Tout les chemins des modules chargé :" + Configuration.module.allModules)
            }
                else if(Configuration.module.useModule == true) {
                return new ErrorSystem.ForbidenError("Impossible de trouver des modules, le serveur s'arrête")
            } else {
                return new SuccessSystem.OkSuccess("Serveur Lancé sans module")
            }
        }
        static refresh(){
            ModuleEvent.stopServer()
            Configuration.module.useModule = false;
            Configuration.module.startModules = []
            Configuration.module.stopModules = []
            Configuration.module.advanceModules = []
            Configuration.module.updateModules = []
            Configuration.module.allModules = []
            Configuration.module.sendModules = []
            Configuration.module.receiveModules = []
            Configuration.module.connectModules = []
            Configuration.module.disconnectModules = []
            let setup = ModuleLoader.setupModules()
            if(setup.code == 200){
                Configuration.module.useModule = true
                return true
            } else {
                return false
            }
        }

        static getModuleName(modulePath:string) {
            let modulePathArray = modulePath.split("/")
            let modulesIndex = 0
            modulePathArray.forEach((word, index) => {
                if(word != "modules"){
                    return
                } else {
                    modulesIndex = index + 1
                }
            })
            return modulePathArray[modulesIndex]
        }
    }
    export class ModuleEvent{
        /**
         * Évènement appelé quand le serveur démarre.
         */
        static startServer():void {
            Configuration.module.startModules.forEach(moduleData => {
                const module = require(moduleData.pathToModule)
                try {
                    module.start()
                } catch {
                    Logger.info(
                        new ErrorSystem.NotFoundError(
                            "The module named : " + moduleData.moduleName + " has no \"start()\" method on this server."
                        )
                    )                }
            })
        }
        /**
         * Évènement appelé quand le serveur s'arrête.
         */
        static stopServer():void {
            Configuration.module.stopModules.forEach(moduleData => {
                const module = require(moduleData.pathToModule)
                try {
                    module.stop()
                } catch {
                    Logger.info(
                        new ErrorSystem.NotFoundError(
                            "The module named : " + moduleData.moduleName + " has no \"stop()\" method on this server."
                        )
                    )                }
            })
        }
        /**
         * Évènement appelé quand un client se connecte au serveur. clientData contient les informations de connexion.
         * @param {any} clientData 
         */
        static clientConnexion(clientData:any):void {
            Configuration.module.connectModules.forEach(moduleData => {
                const module = require(moduleData.pathToModule)
                try {
                    module.connect(clientData)
                } catch {
                    Logger.info(
                        new ErrorSystem.NotFoundError(
                            "The module named : " + moduleData.moduleName + " has no \"connect()\" method on this server."
                        )
                    )                }
            })
        }
        /**
         * Évènement appelé quand un client se déconnecte du serveur. clientData contient les informations de déconnexion.
         * @param {any} clientData 
         */
        static clientDeconnexion(clientData:any):void {
            Configuration.module.disconnectModules.forEach(moduleData => {
                const module = require(moduleData.pathToModule)
                try {
                    module.disconnect(clientData)
                } catch {
                    Logger.info(
                        new ErrorSystem.NotFoundError(
                            "The module named : " + moduleData.moduleName + " has no \"disconnect()\" method on this server."
                        )
                    )
                }
            })
        }
        /**
         * Évènement appelé à chaque fois qu'un client envoie des données au serveur. packet contient les données du client en lui-même (pas les données pour les modules spécifiques).
         * @param {any} packet 
         */
        static updateModule(packet:any):void {
            Configuration.module.updateModules.forEach(moduleData => {
                const module = require(moduleData.pathToModule)
                try {
                    module.update(packet)
                } catch {
                    Logger.info(
                        new ErrorSystem.NotFoundError(
                            "The module named : " + moduleData.moduleName + " has no \"update()\" method on this server."
                        )
                    )                }
            })
        }
        /**
         * Évènement appelé à chaque fois qu'un client envoie des données contenant un paquet pour un module spécifique. moduleData contient le paquet pour le module spécifique.
         * @param {string} moduleName
         * @param {any} moduleData 
         */
        static receiveForModule(moduleName:string, moduleData:any):void {
            try {
            const module = require('./modules/' + moduleName + "/main.js")
            module.receive(moduleData)
            } catch {
                Logger.info("There isn't module named : " + moduleName + " who has \"receive()\" method on this server.")
            }
        }
        /**
         * Évènement appelé tout les tics physique du serveur +/- 50 fois par secondes
         */
        static serverAdvance():void {
                Configuration.module.advanceModules.forEach(moduleData => {
                    const module = require(moduleData.pathToModule)
                    try {
                        module.advance()
                    } catch {
                        Logger.info(
                            new ErrorSystem.NotFoundError(
                                "The module named : " + moduleData.moduleName + " has no \"advance()\" method on this server."
                            )
                        )                    }
                })
        }
        /**
         * Évènement appelé juste avant d'envoyer les données au différent client, permet de modifier les données sortantes pour ajouter les siennes.
         */
        static async networkSend():Promise<void> {
            Configuration.module.sendModules.forEach(moduleData => {
                const module = require(moduleData.pathToModule)
                try {
                    module.send()
                } catch {
                    Logger.info(
                        new ErrorSystem.NotFoundError(
                            "The module named : " + moduleData.moduleName + " has no \"send()\" method on this server."
                        )
                    )                }
            })
        }
    }
}

export default ModuleSystem