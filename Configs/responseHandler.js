class ResponseHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    sender(code, message, data, error, info) {
        this.res
            .status(code)
            .json({
                message,
                data,
                error : info
            });
        if(error) {
            console.log("ERROR", error)
        }
    }

    success(data, message, info) { 
        this.sender(
            STATUS_CODES.SUCCESS,
            message || 'Success',
            data, info
        ) 
    }

    badRequest(data, message, info) {
        this.sender(
            STATUS_CODES.BAD_REQUEST,
            message || 'Bad Request',
            data, info
        )
    }

    unauthorized(data, message, info) { 
        this.sender(
            STATUS_CODES.UNAUTHORIZED,
            message || 'Unauthorized',
            data, info
        )
    }

    forbidden(data, message, info) { 
        this.sender(
            STATUS_CODES.FORBIDDEN,
            message || 'Forbidden',
            data, info
        )
    }

    notFound(data, message, info) { 
        this.sender( 
            STATUS_CODES.NOT_FOUND,
            message || 'Not Found',
            data, info
        )
    }

    serverError(error) {
        this.sender(
            STATUS_CODES.SERVER_ERROR,
            'Server Error',
            undefined,
            error
        )
    }
}

module.exports = ResponseHandler;

