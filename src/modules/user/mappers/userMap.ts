import { User } from "../domain/user";
import { rawUser } from "../dto/user";

export class UserMap {
    public static toDomain(props: any): User {
        const { _id, username, password, type, createdAt, updatedAt } = props;
        return User.create({ username, password, type, createdAt, updatedAt }, _id.toString());
    }

    public static async toPersistance(user: User): Promise<rawUser> {
        const userProps = user.props;
        const password = await userProps.password.getHashedPassword();
        return { ...userProps, password, _id: userProps.id };
    }
}
