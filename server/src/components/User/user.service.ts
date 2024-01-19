import { User, UserInterface } from '../User';

export const createUser = async (user: UserInterface): Promise<User> => {
    return await User.create(user);
};
