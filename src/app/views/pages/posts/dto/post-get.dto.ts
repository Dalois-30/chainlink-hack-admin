
export class UpdatePostDto {
    title: string;
    content: string;
    status: boolean;
}

export class CreatePostDto {
    title: string;
    content: string;
    status: boolean;
    category: string;
    author: string;
}


export class GetPostDto {
    id: string;
    title: string;
    content: string;
    user: string;
    status: boolean;
    comments: number;
    created_at: Date;
    updated_at: Date;
    image: string;
}