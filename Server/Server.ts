import ErrorSystem from "../ErrorsAndSuccess/Errors"
import SuccessSystem from "../ErrorsAndSuccess/Success"
import NetworkSystem from "./ServerSystems/NetworkManager"
import ModuleSystem from "./ServerSystems/ModuleSystem"
import { Configuration } from "../config"
import Logger from "../utils/logger"
import WebSocket from 'ws'
import {Player} from "../Player/Player"

namespace ServerSystem {
    
    export class Node {
        static allPlayers:any[] = []
        static start(){
            let setup = ModuleSystem.ModuleLoader.setupModules()
            if(setup.code == 200) {
                ModuleSystem.ModuleEvent.startServer()
            } else if (setup.code != 200){
                Logger.info(setup)
            }
                
        }

        static async runLogic(){
            Logger.info("Démarrage de la logique");
            let eachTics = 1000/Configuration.server.physicTic;
            Logger.debug(eachTics)
            while (Configuration.server.runServer == true) {
                let startWork = Date.now()
                NetworkSystem.PackageManager.sendPackages(Node.allPlayers)
                Logger.info("Coucou les mecs ! " + Date.now())
                let endWork = Date.now() - startWork
                Logger.info(eachTics - endWork)
                await new Promise(resolve => setTimeout(resolve, eachTics - endWork));
            }
        }

        static restart(){
            Configuration.server.runServer = false
            ModuleSystem.ModuleLoader.refresh()
            Configuration.server.runServer = true
        }

        static stop(){
            Configuration.server.runServer = false
            Logger.info("Server just stopped")
        }
    }
}

export default ServerSystem