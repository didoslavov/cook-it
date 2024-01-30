import TokensBlacklist from './TokensBlacklist.model';
import { BlackListed } from './tokensBlacklist.interface';

const blackListToken = async (token: string): Promise<BlackListed> => {
    console.log('TOKEN TOKEN TOKEN ', token);

    return await TokensBlacklist.create({ token }).then((token): BlackListed => token.toJSON());
};

const getBlacklistedToken = async (token: string): Promise<BlackListed | undefined> => {
    return await TokensBlacklist.findOne({ where: { token } }).then((token): BlackListed | undefined => token?.toJSON());
};

export { blackListToken, getBlacklistedToken };
