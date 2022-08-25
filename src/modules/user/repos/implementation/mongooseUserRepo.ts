import { User } from "../../domain/user";
import { SellerInfo } from "../../dto/user";
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

    // TODO: later have to paginate this.
    // If there are millions of sellers, getting all will cause a problem
    async getAllSellers(): Promise<SellerInfo[]> {
        const userModel = this.models.User;
        const rawSellers = await userModel.find(
            { type: "seller" },
            { id: "$_id", username: 1, _id: 0 }
        );
        return rawSellers;
    }

    async save(user: User): Promise<void> {
        const userModel = this.models.User;
        const rawMongooseUser = await UserMap.toPersistance(user);
        await userModel.create(rawMongooseUser);
    }
}
