type ValidationError = {
    msg: string;
};

export default (error: ValidationError): string => error.msg;
