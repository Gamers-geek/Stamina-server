const mysql = require("mysql")

const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host:"83.150.217.31",
    port:3306,
    user:"u8_UsDeiAODqO",
    password:"7aUvN!rto!Awm^Z6ztmbhEkS",
    database:"s8_test"
})

async function asyncFunction() {
    let conn;
    try {
  
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * from test ORDER BY name DESC");
      // rows: [ {val: 1}, meta: ... ]
  
      const res = await conn.query("INSERT INTO test value (?, ?)", [1, "mariadb"]);
      // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
    console.log(res)
    console.log(rows)
  
    } finally {
      if (conn) conn.release(); //release to pool
    }
}

let connection = mysql.createConnection({
    host:"bdd.adkynet.com",
    user:"u5924_QXFUmsmvFH",
    password:"u2VUBWjwDGI6@CEroZsFth=@",
    database:"s5924_stamina_temp"
    })

function bdd_start(){
    connection.connect(function(err){
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
          console.log("connected as id : ", connection.threadId)
    })
}

module.exports = {connection, bdd_start, asyncFunction, pool}
