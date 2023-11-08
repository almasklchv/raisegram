import { Body, Controller, Post } from '@nestjs/common';
import { PostDto } from 'src/post/dto';
import { IdeaService } from './idea.service';
import { IdeaDto } from './dto';

@Controller('/api/idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  async saveIdea(@Body() dto: IdeaDto) {
    return this.ideaService.saveIdea(dto);
  }
}
