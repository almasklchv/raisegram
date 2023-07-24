import { Controller, HttpCode, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiDto } from './dto';

@Controller('/ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('/text')
  @HttpCode(200)
  async sendMessage(@Query() dto: AiDto) {
    const reply = await this.aiService.getPost(dto);
    return { reply };
  }

  @Post('/image')
  @HttpCode(200)
  async getImage(@Query() text: string) {
    const imageUrl = await this.aiService.getImage(text);
    return imageUrl;
  }
}
