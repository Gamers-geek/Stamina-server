const mariadb = require("mariadb");
const { BadRequestError } = require("../ErrorSystem/Errors");
const { OkSuccess } = require("../ErrorSystem/Success");
const Debug = require("../utils/debug")

const pool = mariadb.createPool({
    host:process.env.DBHOST,
    port:process.env.DBPORT,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBDATABASE
})

///!\ REFAIRE LES BASES DE DONNÉES POUR COLLER AU SYSTEME DE GESTION DE PAQUETS ET À CE QUE LES SERVEURS ONT BESOIN

/**
 * Gestionnaire de base de données MariaDB. Entièrement en static pour éviter de devoir se reconnecter à la db à chaque requête.
 */
class DataBase{
    /**
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
            Debug.debug(new BadRequestError())
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
    //Refaire la base de donnée du serveur, pour prendre en compte ttes les versions possibles
    //Ou alors faire une table à côté qui sauvegarde les versions selon le nom du serveur, c'est selon
    static async saveVersion(serverName, content, version){
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO `servers_new()`")
        } catch {
            return new BadRequestError("Impossible de créer une nouvelle version")
        } finally {
            if(conn) conn.release();
        }

    }
}

module.exports = DataBase