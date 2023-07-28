import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostDto } from './dto';
import { PostService } from './post.service';

@Controller('/api/post')
export class PostController {
  constructor(private postService: PostService) {}
  
  @Post()
  async savePost(@Body() dto: PostDto) {
    return this.postService.savePost(dto);
  }

  @Post('/view')
  async getPosts(@Query() authorId: string) {
    return this.postService.getPosts(authorId);
  }
}
