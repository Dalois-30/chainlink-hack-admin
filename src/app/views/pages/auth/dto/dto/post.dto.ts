import { Category } from "./category.dto";
import { Comments } from "./comment.dto";
import { User } from "./user.dto";

export interface Post {
    id: string;
    title: string;
    content: string;
    image: string;
    status: boolean;
    tags: string;
    category: Category;
    user: User;
    comments: Comments[]
    created_at: Date;
    updated_at: Date;
}

export interface PostResponse {
    image: string;
    post: Post;
}