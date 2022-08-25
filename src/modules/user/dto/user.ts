import { Password } from "../../../shared/domain/value-objects/password";

export interface userDTO {
    username: string;
    password: Password;
    type: "buyer" | "seller";

    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface rawUser {
    _id: string;
    username: string;
    password: string;
    type: "buyer" | "seller";

    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface SellerInfo {
    id: string;
    username: string;
}
