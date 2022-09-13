require('dotenv').config({ path: __dirname+'/.env' });
import ModuleSystem from "./Server/ServerSystems/ModuleSystem";
import ServerSystem from "./Server/Server"

ServerSystem.Node.start()

ModuleSystem.ModuleLoader.setupModules()