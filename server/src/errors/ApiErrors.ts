export class GenericError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends GenericError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends GenericError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class NotFoundError extends GenericError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ConflictError extends GenericError {
    constructor(message: string) {
        super(message, 409);
    }
}