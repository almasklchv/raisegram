import { User } from "@prisma/client";

export class PostDto {
    title: string;
    keywords: string;
    imageUrl: string;
    post: string;
    authorId: string;
    date: string;
}