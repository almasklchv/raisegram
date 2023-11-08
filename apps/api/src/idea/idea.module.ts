import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { PostService } from 'src/post/post.service';

@Module({
  controllers: [IdeaController],
  providers: [PostService],
})
export class IdeaModule {}
