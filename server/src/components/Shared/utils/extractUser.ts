import { Request } from 'express';
import { UserDataRequest } from '../../User';

export default (req: Request): UserDataRequest => {
    return req as UserDataRequest;
};
