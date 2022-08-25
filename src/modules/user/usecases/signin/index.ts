import { SignInUseCase } from "./usecase";
import { userRepo } from "../../repos";

export const signInUseCase = new SignInUseCase(userRepo);
