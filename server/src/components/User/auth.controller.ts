import expressAsyncHandler from 'express-async-handler';
import { createUser } from '.';
import { User } from '.';

const register = expressAsyncHandler(async (req, res) => {
    const userData: User = req.body;

    const user = await createUser(userData);
    res.status(200).json(user);
});

export { register };
