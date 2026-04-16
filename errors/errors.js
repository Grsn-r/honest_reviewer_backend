class notFoundError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 404;
    }
}

class authError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 401;
    }
}

class badRquestError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 400;
    }
}

export {notFoundError, authError, badRquestError};