import { User, UserInterface } from '../User';

export const createUser = async (user: UserInterface): Promise<UserInterface | undefined> => {
    return await User.create(user).then((user): UserInterface | undefined => user.toJSON());
};

export const findUser = async (email: string): Promise<UserInterface | undefined> => {
    return await User.findOne({ where: { email } }).then((user): UserInterface | undefined => user?.toJSON());
};
