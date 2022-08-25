import { User } from "../domain/user";
import { SellerInfo } from "../dto/user";

export interface IUserRepo {
    getById(userId: string): Promise<User>;
    getByUsername(username): Promise<User>;
    getAllSellers(): Promise<SellerInfo[]>;
    save(user: User): Promise<void>;
}
