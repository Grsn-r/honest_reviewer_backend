class notFoundError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 404;
    }
}

class authError extends Error{
    constructor(essage){
        super(message);
        this.statusCode = 401;
    }
}

export {notFoundError, authError};