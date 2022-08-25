import { SellerInfo } from "../../dto/user";
import { IUserRepo } from "../../repos/userRepo";

export class GetSellersUseCase {
    private userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    public async execute(): Promise<SellerInfo[]> {
        const sellersInfo = await this.userRepo.getAllSellers();
        return sellersInfo;
    }
}
