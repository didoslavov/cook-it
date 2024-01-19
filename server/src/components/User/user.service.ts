import { User, UserInterface } from '../User';

export const createUser = async (user: UserInterface): Promise<UserInterface> => {
    return await User.create(user).then((user): UserInterface => user.toJSON());
};

export const findUserByEmail = async (email: string): Promise<UserInterface | undefined> => {
    return await User.findOne({ where: { email } }).then((user): UserInterface | undefined => user?.toJSON());
};

export const findUserById = async (id: string): Promise<User | undefined> => {
    return await User.findByPk(id).then((user): User | undefined => user?.toJSON());
};
