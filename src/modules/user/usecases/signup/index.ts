import { SignUpUseCase } from "./usecase";
import { userRepo } from "../../repos";

export const signUpUseCase = new SignUpUseCase(userRepo);
