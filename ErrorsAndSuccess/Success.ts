/**
 * namespace pour le système de succès, ça permet de "simplifier" le systeme en le rendant plus accessible
 * Système de succès pour définir l'état de la réussite de la requête. (Voir le système d'erreur)
*/
export namespace SuccessSystem {

    /**
     * class Parent pour le système de succès, elle prend les paramètres communs à tout les succès
     */
    class SuccessClass {
        succes_type: string
        details: null
        code: Number
        content: null
        /**
         * @param {String} succesType
         * @param {Number} successCode
         * @param {any} successContent
         * @param {String} succesDetails
         */
        constructor(succesType: string, successCode: Number, successContent?: any, succesDetails?: any) {
            this.succes_type = succesType
            this.code = successCode
            this.content = successContent
            this.details = succesDetails
        }
    }

    export class OkSuccess extends SuccessClass {
        /**
         * @param {any} content 
         * @param {String} details 
         */
        constructor(content?: any, details?: string) {
            super("OK", 200, content, details)
        }
    }

    export class CreatedSuccess extends SuccessClass {
        /**
         * @param {any} content 
         * @param {String} details 
         */
        constructor(content?: any, details?: string) {
            super("Creation", 201, content, details)
        }
    }

    export class AcceptedSuccess extends SuccessClass {
        /**
         * @param {any} content 
         * @param {String} details 
         */
        constructor(content?: any, details?: string) {
            super("Accepted", 202, content, details)
        }
    }
}