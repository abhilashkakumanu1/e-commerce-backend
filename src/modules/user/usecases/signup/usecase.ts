import { User } from "../../domain/user";
import { IUserRepo } from "../../repos/userRepo";
import { SignUpDTO } from "./dto";

export class SignUpUseCase {
    private userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async execute(request: SignUpDTO): Promise<string> {
        const user = User.create(request);

        await this.userRepo.save(user);

        return user.props.id;
    }
}
