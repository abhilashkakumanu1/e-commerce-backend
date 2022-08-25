import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { IUserRepo } from "../userRepo";

export class MongooseUserRepo implements IUserRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getById(userId: string): Promise<User> {
        const userModel = this.models.User;
        const user = await userModel.findById(userId);
        return UserMap.toDomain(user);
    }

    async getByUsername(username): Promise<User> {
        const userModel = this.models.User;
        const user = await userModel.findOne({ username });
        return UserMap.toDomain(user);
    }

    async save(user: User): Promise<void> {
        const userModel = this.models.User;
        const rawMongooseUser = await UserMap.toPersistance(user);
        await userModel.create(rawMongooseUser);
    }
}
