import { Post, PostResponse } from "./post.dto";

export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    parent: Category;
    children: Category[];
    posts: PostResponse[];
    created_at: Date;
    updated_at: Date;
}

export interface CategoryResponse{
    image: string;
    cat: Category;
}