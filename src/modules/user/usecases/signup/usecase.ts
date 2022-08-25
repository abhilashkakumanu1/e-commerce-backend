import { Password } from "../../../../shared/domain/value-objects/password";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repos/userRepo";
import { SignUpDTO } from "./dto";

export class SignUpUseCase {
    private userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async execute(request: SignUpDTO): Promise<string> {
        // Validation
        const password = Password.create({ value: request.password, hashed: false });

        const user = User.create({ ...request, password });

        await this.userRepo.save(user);

        return user.props.id;
    }
}
