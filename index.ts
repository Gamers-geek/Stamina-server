require('dotenv').config({ path: __dirname+'/.env' });
import Logger from "./utils/logger";
import Server from "./Server/Server"

Logger.debug("Hello")

let ServerRun = Server.run()

//Debug.debug(ServerRun)

//Debug.debug(getAllInstance)