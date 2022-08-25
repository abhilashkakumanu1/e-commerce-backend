export interface SignUpDTO {
    username: string;
    password: string;
    type: "buyer" | "seller";
}
