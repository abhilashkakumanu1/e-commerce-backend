import { Router } from "express";
import { signUpUseCase } from "../../../modules/user/usecases/signup";

export const router = Router();

// Health check route
router.get("/health-check", (_, res) => {
    res.send("Working!");
});

// User Signup
router.post("/auth/register", async (req, res) => {
    const data = req.body;
    const userId = await signUpUseCase.execute(data);
    return res.json({
        ok: true,
        data: {
            userId,
        },
    });
});
