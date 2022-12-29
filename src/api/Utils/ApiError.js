class ApiError extends Error {
    constructor(status, name, message, isOperational = true, stack = "") {
        super(message);
        this.status = status;
        this.name = name;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;