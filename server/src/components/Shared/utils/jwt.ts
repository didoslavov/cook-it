import jwt, { JwtPayload } from 'jsonwebtoken';
const secret = process.env.SECRET || 'Potato';

export function createToken(data: string | object): string {
    return jwt.sign(data, secret, { expiresIn: '1d' });
}

export function verifyToken(token: string): Promise<string | JwtPayload | undefined> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data): void => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
