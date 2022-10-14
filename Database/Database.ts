import mariadb from "mariadb";
import ErrorSystem from "../ErrorsAndSuccess/Errors";

const pool = mariadb.createPool({
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
})

///!\ REFAIRE LES BASES DE DONNÉES POUR COLLER AU SYSTEME DE GESTION DE PAQUETS ET À CE QUE LES SERVEURS ONT BESOIN
//+ Vu que les clients ne sauvegardent pas toutes les données, il faut que lors de la création d'une instance player
//On aille chercher les infos dans la bdd pour le client.

/**
 * Gestionnaire de base de données MariaDB. Entièrement en static pour éviter de devoir se reconnecter à la db à chaque requête.
 */
export default class DataBase {
    /**
     * @param {ServerInstance} server 
     */
    static async saveNewServer(server: { serverName: String, port: Number, protocol: String, amountPlayer: Number, runStatut: Boolean, allPlayers: Object, physicTic: Number, id: Number }): Promise<void> {
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO `servers_new`(`serverName`, `port`, `protocol`, `amountPlayer`, `runStatut`, `allPlayers`, `physic_tic`, `id`) VALUES (?,?,?,?,?,?,?,?,?)",
                [server.serverName, server.port, server.protocol, server.amountPlayer, server.runStatut, server.allPlayers, server.physicTic, server.id])
            console.log(res)
        }/*catch{
            Debug.debug(new BadRequestError())
        }*/finally {
            if (conn) conn.release();
        }
        //console.log("HSKDGFHKSHBGMKHGIMKSHNGMLSZJKh")
    }
    static async deleteServer(serverName: string) {

    }

    static async getAllPackets(serverName: string) {
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query("SELECT sender FROM servers_new WHERE serverName = ?", [serverName])
            console.log(res)
            return res
        } catch {
            return new ErrorSystem.BadRequestError("Impossible d'avoir les informations de sender")
        } finally {
            if (conn) conn.release();
        }
    }
    //Refaire la base de donnée du serveur, pour prendre en compte ttes les versions possibles
    //Ou alors faire une table à côté qui sauvegarde les versions selon le nom du serveur, c'est selon
    static async saveVersion(serverName: string, content: string, version: string) {
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO `servers_new()`")
        } catch {
            return new ErrorSystem.BadRequestError("Impossible de créer une nouvelle version")
        } finally {
            if (conn) conn.release();
        }
    }
}