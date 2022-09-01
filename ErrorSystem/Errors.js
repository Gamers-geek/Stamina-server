/**
 * Système d'erreur pour définir si une demande a été réalisé ou non. (Voir le système de succès)
 */
class Error{
    constructor(error_name, details, code){
        this.error_name = error_name
        this.details = details
        this.code = code
    }
}

class NotFoundError extends Error {
    /**
     * @param {String} details 
     */
    constructor(details){
        super("Not Found Error", details, 404)
    }
}

class UnauthorizedError extends Error {
    /**
     * @param {String} details 
     */
    constructor(details){
        super("Unauthorized Error", details, 401)
    }
}

class BadRequestError extends Error {
    /**
     * @param {String} details 
     */
    constructor(details){
        super("Bad Request Error", details, 400)
    }
}

class ForbidenError extends Error {
    /**
     * @param {String} details 
     */
    constructor(details){
        super("Forbiden Error", details, 403)
    }
}

class TooManyRequestsError extends Error {
    /**
     * @param {String} details 
     */
    constructor(details){
        super("Too Many Requests Error", details, 429)
    }
}

class RequestTimeOutError extends Error{
    /**
     * @param {String} details 
     */
    constructor(details){
        super("Request time Out Error", details, 408)
    }
}

module.exports = {NotFoundError, UnauthorizedError, BadRequestError, ForbidenError, TooManyRequestsError, RequestTimeOutError}