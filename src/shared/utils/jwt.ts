import jwt from "jsonwebtoken";

import { JWT_ACCESS_TOKEN_SECRET, JWT_EXPIRY_IN_SECS } from "../../../config";

console.log(JWT_ACCESS_TOKEN_SECRET, JWT_EXPIRY_IN_SECS);

export const signJWT = (data: object) => {
    const token = jwt.sign(data, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_EXPIRY_IN_SECS });
    return token;
};

export const verifyJWT = (token: string): any => {
    try {
        const data = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
        const currentDate = new Date().getTime() / 1000;
        if (currentDate > data.exp) {
            return null;
        }
        return data;
    } catch (err) {
        return null;
    }
};
