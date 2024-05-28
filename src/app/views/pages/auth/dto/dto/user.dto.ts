import { Comments } from "./comment.dto";
import { Post, PostResponse } from "./post.dto";

export interface User {
    id: string;
    email: string;
    password: string;
    username: string;
    comments: Comments[];
    posts: PostResponse[];
    verified: boolean;
    role: UserRoles;
    created_at: Date;
    updated_at: Date;
}

export interface UserDecoded {
    email: string;
    id: string;
    role: UserRoles;
}

export enum UserRoles {
    'USER' = 'User',
    'ADMIN' = 'Admin',
    'BLOGGER' = 'Blogger'
  }