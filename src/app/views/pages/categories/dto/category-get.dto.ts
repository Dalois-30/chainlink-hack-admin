export class CategoryGetDto {
    id: string;
    name: string;
    description: string;
    posts: number;
    image: string;
    children: ParentChildrenCat[];
    created_at: Date;
    updated_at: Date;
}

export interface ParentChildrenCat {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export class UpdateCatDto {
    name: string;
    description: string;
    parent: string | null;
}