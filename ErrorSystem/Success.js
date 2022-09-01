/**
 * Système de succès pour définir si une demande a été réalisé ou non. (Voir le système d'erreur)
 */
class Success{
    /**
     * 
     * @param {String} succes_type 
     * @param {Number} code 
     * @param {any} content 
     * @param {String} details 
     */
    constructor(succes_type, code, content=null,details=null){
        this.succes_type = succes_type
        this.details = details
        this.code = code
        this.content = content
    }
}

class OkSuccess extends Success {
    /**
     * @param {any} content 
     * @param {String} details 
     */
    constructor(content=null, details=null){
        super("OK", 200, content, details)
    }
}

class CreatedSuccess extends Success {
    /**
     * @param {any} content 
     * @param {String} details 
     */
    constructor(content=null, details=null){
        super("Creation", 201, content, details)
    }
}

class AcceptedSuccess extends Success {
    /**
     * @param {any} content 
     * @param {String} details 
     */
    constructor(content=null, details=null){
        super("Accepted", 202, content, details)
    }
}

module.exports = {OkSuccess, CreatedSuccess, AcceptedSuccess}