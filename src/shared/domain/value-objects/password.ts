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

    // compares a plain text password & hashed password
    public async comparePassword(hashedPassword: string): Promise<boolean> {
        // If password is already hashed, just compare the strings
        if (this.props.hashed) {
            return this.props.value === hashedPassword;
        }

        return await bcrypt.compare(this.props.value, hashedPassword);
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
            hashed: props.hashed ?? false,
        });
    }
}
