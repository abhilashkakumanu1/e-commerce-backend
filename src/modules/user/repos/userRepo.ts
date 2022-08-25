import { User } from "../domain/user";

export interface IUserRepo {
    getById(userId: string): Promise<User>;
    getByUsername(username): Promise<User>;
    save(user: User): Promise<void>;
}
