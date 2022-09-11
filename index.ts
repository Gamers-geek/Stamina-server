require('dotenv').config({ path: __dirname+'/.env' });
import Logger from "./utils/logger";
import ModuleSystem from "./Server/ServerSystems/ModuleSystem";
import ServerSystem from "./Server/Server"

Logger.debug("Hello")

ServerSystem.Node.start()

//let ServerRun = Server.run()

//Debug.debug(ServerRun)

//Debug.debug(getAllInstance)

ModuleSystem.ModuleLoader.setupModules()