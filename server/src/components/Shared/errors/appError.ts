class AppError extends Error {
    status: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.status = statusCode;

        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError;
