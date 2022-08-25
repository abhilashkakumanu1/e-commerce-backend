import jwt from "jsonwebtoken";

import { JWT_ACCESS_TOKEN_SECRET, JWT_EXPIRY_IN_MINS } from "../../../config";

export const signJWT = (data: Object, secret = JWT_ACCESS_TOKEN_SECRET) => {
    const token = jwt.sign(data, secret, { expiresIn: 60 * JWT_EXPIRY_IN_MINS });
    return token;
};

export const verifyJWT = (token: string): any => {
    try {
        const data = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
        const currentData = new Date().getTime() / 1000;
        if (currentData > data.exp) {
            return null;
        }
        return data;
    } catch (err) {
        return null;
    }
};
