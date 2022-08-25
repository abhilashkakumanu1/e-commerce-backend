import { MongooseUserRepo } from "./implementation/mongooseUserRepo";
import { models } from "../../../shared/infra/database/models";

export const userRepo = new MongooseUserRepo(models);
