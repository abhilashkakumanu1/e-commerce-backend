import { GetSellersUseCase } from "./usecase";
import { userRepo } from "../../repos";

export const getSellersUseCase = new GetSellersUseCase(userRepo);
