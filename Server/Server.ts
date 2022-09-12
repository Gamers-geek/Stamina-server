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
        static start(){
            let setup = ModuleSystem.ModuleLoader.setupModules()
            if(setup.code == 200) {
                NetworkSystem.EventHandler.launch()
                ModuleSystem.ModuleEvent.startServer()
                Node.runLogic()
            } else if (setup.code != 200){
                Logger.info(setup)
            }
                
        }

        static async runLogic(){
            Logger.info("Démarrage de la logique ...");
            let eachTics = 1000/Configuration.server.physicTic;
            Logger.debug(eachTics)
            while (Configuration.server.runServer == true) {
                let startWork = Date.now()
                ModuleSystem.ModuleEvent.serverAdvance()
                await NetworkSystem.PackageManager.sendPackages()
                Logger.info("Coucou les mecs ! " + Date.now())
                let endWork = Date.now() - startWork
                Logger.info(eachTics - endWork)
                await new Promise(resolve => setTimeout(resolve, eachTics - endWork));
            }
        }

        static restart(){
            Logger.info("Restarting Server ...")
            Configuration.server.runServer = false
            let refreshModule = ModuleSystem.ModuleLoader.refresh()
            if(refreshModule == true){
                Configuration.server.runServer = true
                ModuleSystem.ModuleEvent.startServer()
                Logger.info(new SuccessSystem.OkSuccess("Server restarted with success !"))
            } else if (refreshModule == false){
                Logger.info(new ErrorSystem.BadRequestError("Server can't restart, no details provided"))
            }
        }

        static stop(){
            Logger.info("Server stopping ...")
            Configuration.server.runServer = false
            Logger.info(new SuccessSystem.OkSuccess("Server just stopped with success !"))
        }
    }
}

export default ServerSystem