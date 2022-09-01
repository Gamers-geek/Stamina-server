require("dotenv").config()
const Server = require("./Server/Server");
const {debug, playerMessage, debugError}= require("./utils/debug")

let ServerRun = Server.run()

debug(ServerRun)

let getAllInstance = Server.getAllServerInstances()

debug(getAllInstance)