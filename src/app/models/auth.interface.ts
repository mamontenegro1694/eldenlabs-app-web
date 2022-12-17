import { User } from "./user.interface";

export interface Auth {
    token: string;
    user: User;
}
