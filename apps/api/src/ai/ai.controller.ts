import { Body, Controller, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiDto } from './dto';

@Controller('/ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('/text')
  async sendMessage(@Query() dto: AiDto) {
    const reply = await this.aiService.getPost(dto);
    return { reply };
  }

  @Post('/image')
  async getImage() {}
}
