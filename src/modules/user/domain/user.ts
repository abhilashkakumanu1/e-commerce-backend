import { v4 as uuidv4 } from "uuid";

import { Password } from "../../../shared/domain/value-objects/password";
import { userDTO } from "../dto/user";

interface UserProps {
    id: string;
    username: string;
    password: Password;
    type: "seller" | "buyer";
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export class User {
    readonly props: UserProps;

    // Private constructor => Singleton Pattern
    private constructor(props: UserProps) {
        this.props = props;
    }

    public static create(props: userDTO, id?: string): User {
        // TODO: Do, any required validation here!

        // create user if it doesn't exist
        let userId = id;
        if (!id) {
            userId = uuidv4();
        }

        // Add defaults for createdAt, updatedAt if they are not present
        props.createdAt ?? (props.createdAt = new Date());
        props.updatedAt ?? (props.updatedAt = new Date());

        const user = new User({ ...props, id: userId });

        return user;
    }
}
