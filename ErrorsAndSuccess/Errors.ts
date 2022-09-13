/**
 * namespace pour le système d'erreur, ça permet de "simplifier" le systeme en le rendant plus accessible
 * Système d'erreur pour définir comment la requête à échouer. (Voir le système de succès)
*/
namespace ErrorSystem {
    /**
     * class Parent pour le système d'erreur, elle prend les paramètres communs à toutes les erreurs
    */
    class ErrorClass {
        error_name: string
        details: string
        code: Number
        constructor(errorName: string, errorDetails: string, errorCode: Number) {
            this.error_name = errorName
            this.details = errorDetails
            this.code = errorCode
        }
    }

    export class NotFoundError extends ErrorClass {
        /**
         * @param {String} errorDetails 
         */
        constructor(errorDetails: string) {
            super("Not Found Error", errorDetails, 404)
        }
    }

    export class UnauthorizedError extends ErrorClass {
        /**
         * @param {String} errorDetails 
         */
        constructor(errorDetails: string) {
            super("Unauthorized Error", errorDetails, 401)
        }
    }

    export class BadRequestError extends ErrorClass {
        /**
         * @param {String} errorDetails 
         */
        constructor(errorDetails: string) {
            super("Bad Request Error", errorDetails, 400)
        }
    }

    export class ForbidenError extends ErrorClass {
        /**
         * @param {String} errorDetails 
         */
        constructor(errorDetails: string) {
            super("Forbiden Error", errorDetails, 403)
        }
    }

    export class TooManyRequestsError extends ErrorClass {
        /**
         * @param {String} errorDetails 
         */
        constructor(errorDetails: string) {
            super("Too Many Requests Error", errorDetails, 429)
        }
    }

    export class RequestTimeOutError extends ErrorClass {
        /**
         * @param {String} errorDetails 
         */
        constructor(errorDetails: string) {
            super("Request time Out Error", errorDetails, 408)
        }
    }
}

export default ErrorSystem