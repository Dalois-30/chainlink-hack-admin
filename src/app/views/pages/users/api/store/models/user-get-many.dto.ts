export interface UserGetDTO {
    id: string;
    email: string;
    username: string;
    password: string;
    verified: boolean;
    roles: string[];
    created_at: Date;
    updated_at: Date;
}