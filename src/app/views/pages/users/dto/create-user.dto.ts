import { UserRoles } from "../../auth/dto/user.dto";

export interface CreateUserDto {
    email: string;
    password: string;
    username: string;
    role: UserRoles;
}
export interface UpdateUserDto {
    email: string;
    username: string;
    verified: boolean;
    role: UserRoles;
}