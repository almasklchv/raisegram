import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async savePost(dto: PostDto) {
    const post = {
      title: dto.title,
      keywords: dto.keywords,
      imageUrl: dto.imageUrl,
      date: dto.date,
      post: dto.post,
    };

    this.prisma.user.update({
      where: {
        id: dto.authorId,
      },
      data: {
        posts: {
          connect: {
            id: dto.authorId,
          },
        },
      },
    });
    return this.prisma.post.create({
      data: {
        ...post,
        author: {
          connect: {
            id: dto.authorId,
          },
        },
      },
    });
  }

  async getPosts(authorId: string) {
    console.log(authorId['authorId']);
    const user = this.prisma.user.findUnique({
      where: {
        id: authorId['authorId'],
      },
      include: {
        posts: true,
      },
    });
    let filteredPosts;
    await user.then((posts) => {
      filteredPosts = posts['posts'].map((post) => {
        const { id, createdAt, authorId, ...filteredPost } = post;
        return filteredPost;
      });
    });
    return filteredPosts
  }
}
