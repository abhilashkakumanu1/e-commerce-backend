import * as bcrypt from "bcrypt";

interface IPasswordProps {
    value: string;
    hashed?: boolean;
}

export class Password {
    readonly props: IPasswordProps;

    private constructor(props: IPasswordProps) {
        this.props = props;
    }

    private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainText, hashed, (err, compareResult) => {
                if (err) return resolve(false);
                return resolve(compareResult);
            });
        });
    }

    //    Compares as plain-text and hashed password.
    public async comparePassword(plainTextPassword: string): Promise<boolean> {
        let hashed: string;
        if (this.isAlreadyHashed()) {
            hashed = this.props.value;
            return this.bcryptCompare(plainTextPassword, hashed);
        } else {
            return this.props.value === plainTextPassword;
        }
    }
    private async hashPassword(plainTextPassword: string): Promise<string> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
        return hashedPassword;
    }

    public isAlreadyHashed(): boolean {
        return this.props.hashed;
    }

    public async getHashedPassword(): Promise<string> {
        if (this.isAlreadyHashed()) {
            return this.props.value;
        }
        return await this.hashPassword(this.props.value);
    }

    public static create(props: IPasswordProps): Password {
        // TODO: Do validation

        return new Password({
            value: props.value,
            hashed: !!props.hashed === true,
        });
    }
}
