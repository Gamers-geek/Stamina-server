require('dotenv').config({ path: __dirname+'/.env' });
import Debug from "./utils/logger";
import Server from "./Server/Server"

Debug.debug("Hello")

let ServerRun = Server.run()

//Debug.debug(ServerRun)

let getAllInstance = Server.getAllServerInstances()

//Debug.debug(getAllInstance)