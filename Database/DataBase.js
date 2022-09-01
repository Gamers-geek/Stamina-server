const mariadb = require("mariadb");
const { BadRequestError } = require("../ErrorSystem/Errors");
const { OkSuccess } = require("../ErrorSystem/Success");
const {debug} = require("../utils/debug")

const pool = mariadb.createPool({
    host:process.env.DBHOST,
    port:process.env.DBPORT,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBDATABASE
})

class DataBase{
    /**
     * 
     * @param {ServerInstance} server 
     */
    static async saveNewServer(server){
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO `servers_new`(`serverName`, `port`, `protocol`, `amountPlayer`, `sender`, `runStatut`, `allPlayers`, `physic_tic`, `id`) VALUES (?,?,?,?,?,?,?,?,?)",
            [server.serverName, server.port, server.protocol, server.amountPlayer, server.sender, server.runStatut, server.allPlayers, server.physicTic, server.id])
            console.log(res)   
        }/*catch{
            debug(new BadRequestError())
        }*/finally{
            if(conn) conn.release();
        }
        //console.log("HSKDGFHKSHBGMKHGIMKSHNGMLSZJKh")
    }
    static async deleteServer(serverName){

    }

    static async getAllPackets(serverName){
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query("SELECT sender FROM servers_new WHERE serverName = ?", [serverName])
            console.log(res)
            return res
        } catch {
            return new BadRequestError("Impossible d'avoir les informations de sender")
        } finally {
        if(conn) conn.release();
        }
    }    
}

module.exports = DataBase