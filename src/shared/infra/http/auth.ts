import { verifyJWT } from "../../utils/jwt";

export const authMiddleware = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.user = verifyJWT(bearerToken);
    }

    next();
};

export const isBuyer = (req, res, next) => {
    const { user } = req;
    if (!user || user?.type !== "buyer") {
        return res.json({
            ok: false,
            error: "No login found. Please try again after logging in.",
        });
    }
    next();
};
