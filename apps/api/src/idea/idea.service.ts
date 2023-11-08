import { Injectable } from '@nestjs/common';
import { IdeaDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IdeaService {
  constructor(private prisma: PrismaService) {}

  async saveIdea(dto: IdeaDto) {
    const idea: any = {
      category: dto.category,
      topics: dto.topics,
      date: dto.date,
      authorId: dto.authorId,
    };

    this.prisma.user.update({
      where: {
        id: dto.authorId,
      },
      data: {
        ideas: {
          connect: {
            id: dto.authorId,
          },
        },
      },
    });

    return this.prisma.idea.create({
      data: {
        ...idea,
        author: {
          connect: {
            id: dto.authorId,
          },
        },
      },
    });
  }
}
