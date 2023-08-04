import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiDto } from './dto';

@Controller('/api/ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('/text')
  @HttpCode(200)
  async sendMessage(@Body() dto: AiDto) {
    const reply = await this.aiService.getPost(dto);
    return { reply };
  }

  @Post('/image')
  @HttpCode(200)
  async getImage(@Body() text: string) {
    const imageUrl = await this.aiService.getImage(text);
    return imageUrl;
  }

  @Post('/idea')
  @HttpCode(200)
  async getIdeas(@Body() category: string) {
    const ideas = await this.aiService.getIdeas(category);
    return ideas;
  }

}
