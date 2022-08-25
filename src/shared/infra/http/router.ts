import { Router } from "express";
import { getSellersUseCase } from "../../../modules/user/usecases/getSellers";

import { signInUseCase } from "../../../modules/user/usecases/signin";
import { signUpUseCase } from "../../../modules/user/usecases/signup";
import { isBuyer } from "./auth";

export const router = Router();

// Health check route
router.get("/health-check", (_, res) => {
    res.send("Working!");
});

// User Signup
router.post("/auth/register", async (req, res) => {
    try {
        const data = req.body;
        const userId = await signUpUseCase.execute(data);
        return res.json({
            ok: true,
            data: {
                userId,
            },
        });
    } catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            error: err.message,
        });
    }
});

// User SignIn
router.post("/auth/login", async (req, res) => {
    try {
        const data = req.body;
        const authToken = await signInUseCase.execute(data);
        return res.json({
            ok: true,
            data: {
                authToken,
            },
        });
    } catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            error: err.message,
        });
    }
});

// Get all sellers
router.get("/buyer/list-of-sellers", isBuyer, async (req, res) => {
    try {
        const sellers = await getSellersUseCase.execute();
        return res.json({
            ok: true,
            data: {
                sellers,
            },
        });
    } catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            error: err.message,
        });
    }
});
