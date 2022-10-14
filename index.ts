require('dotenv').config({ path: __dirname+'/.env' });
import ServerSystem from "./Server/Server"

ServerSystem.Node.start()