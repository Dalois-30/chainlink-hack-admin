import { Post, PostResponse } from "./post.dto";
import { User } from "./user.dto";

export interface Comments {
    id: string;
    content: string;
    user: User;
    post: PostResponse;
    parent: Comments;
    children: Comments;
    created_at: Date;
    updated_at: Date;
}