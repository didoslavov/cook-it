import { User, UserInterface } from '../User';

export const createUser = async (userData: UserInterface): Promise<UserInterface> => {
    const user = await User.create(userData);
    return user.toJSON();
};

export const findAllUsers = async (): Promise<UserInterface[]> => {
    const users = await User.findAll();
    return users.map((u): UserInterface => u.toJSON());
};

export const findUserByEmail = async (email: string): Promise<UserInterface | undefined> => {
    const user = await User.findOne({ where: { email } });
    return user?.toJSON();
};

export const findUserById = async (id: string): Promise<UserInterface | undefined> => {
    const user = await User.findByPk(id);
    return user?.toJSON();
};

export const updateById = async (id: string, updateData: Record<string, string | number>): Promise<UserInterface | undefined> => {
    const user = await User.findByPk(id);
    return user ? (await user.update(updateData)).toJSON() : undefined;
};
