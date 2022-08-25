import { signJWT } from "../../../../shared/utils/jwt";
import { IUserRepo } from "../../repos/userRepo";
import { SignInDTO } from "./dto";

export class SignInUseCase {
    private userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async execute(request: SignInDTO): Promise<string> {
        const { username, password } = request;

        const user = await this.userRepo.getByUsername(username);
        if (!user) {
            throw new Error("User doesn't exist.");
        }

        const doesPasswordsMatch = await user.props.password.comparePassword(password);
        if (!doesPasswordsMatch) {
            throw new Error("Invalid username/password combo.");
        }

        const authToken = signJWT({
            id: user.props.id,
            username: user.props.username,
            type: user.props.type,
        });

        return authToken;
    }
}
