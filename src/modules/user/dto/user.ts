export interface userDTO {
    username: string;
    password: string;
    type: "buyer" | "seller";

    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface rawUser extends userDTO {
    _id: string;
}
