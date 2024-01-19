import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export const comparePasswords = async (hash: string, password: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};
