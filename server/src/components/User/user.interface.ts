import { Request } from 'express';

export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    password: string;
}

export interface UserRequest extends Request {
    user?: UserInterface;
}

export interface UserDataRequest extends Request {
    user: {
        email: string;
        password: string;
    };
}
