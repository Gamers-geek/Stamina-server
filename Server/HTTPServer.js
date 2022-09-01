const express = require('express')
const { port } = require('../config')

/**
 * Serveur HTTP qui s'occupera de gérer les requêtes de l'apil'API.
 */
class HTTPServer{
    constructor(){
        this.app = express()
        this.app.listen(2026)
    }

    getMethod(url, response){

    }

    postMethod(url, response, data){
        
    }
}

module.exports = HTTPServer