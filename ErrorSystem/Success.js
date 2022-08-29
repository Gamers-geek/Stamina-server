class Success{
    constructor(succes_type, code, content=null,details=null){
        this.succes_type = succes_type
        this.details = details
        this.code = code
        this.content = content
        this.as_string()
    }

    as_string(){
        let result = ""
        if(this.details == null){
            result = `${this.succes_type}`
        }else result = `${this.succes_type} : ${this.details}`
        return result
    }
}

class OkSuccess extends Success {
    constructor(content=null, details=null){
        super("OK", 200, content, details)
    }
}

class CreatedSuccess extends Success {
    constructor(content=null, details=null){
        super("Creation", 201, content, details)
    }
}

class AcceptedSuccess extends Success {
    constructor(content=null, details=null){
        super("Accepted", 202, content, details)
    }
}

module.exports = {OkSuccess, CreatedSuccess, AcceptedSuccess}