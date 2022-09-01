class Error{
    constructor(error_name, details, code){
        this.error_name = error_name
        this.details = details
        this.code = code
    }
}

class NotFoundError extends Error {
    constructor(details){
        super("Not Found Error", details, 404)
    }
}

class UnauthorizedError extends Error {
    constructor(details){
        super("Unauthorized Error", details, 401)
    }
}

class BadRequestError extends Error {
    constructor(details){
        super("Bad Request Error", details, 400)
    }
}

class ForbidenError extends Error {
    constructor(details){
        super("Forbiden Error", details, 403)
    }
}

class TooManyRequestsError extends Error {
    constructor(details){
        super("Too Many Requests Error", details, 429)
    }
}

class RequestTimeOutError extends Error{
    constructor(details){
        super("Request time Out Error", details, 408)
    }
}

module.exports = {NotFoundError, UnauthorizedError, BadRequestError, ForbidenError, TooManyRequestsError, RequestTimeOutError}