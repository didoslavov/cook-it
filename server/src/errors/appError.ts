class AppError extends Error {
    status: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.status = statusCode;

        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError;
