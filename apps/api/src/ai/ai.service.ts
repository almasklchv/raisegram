import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { AiDto } from './dto';

@Injectable()
export class AiService {
  constructor(private config: ConfigService) {}
  private readonly OPEN_AI_KEY = this.config.get('OPEN_AI_KEY');
  private readonly PROMPT_FOR_TEXT = this.config.get('PROMPT_FOR_TEXT');
  private readonly PROMPT_FOR_IMAGE = this.config.get('PROMPT_FOR_IMAGE');
  private configuration = new Configuration({
    apiKey: `${this.OPEN_AI_KEY}`,
  });
  private openAi = new OpenAIApi(this.configuration);

  async getPost(dto: AiDto) {
    const response = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${this.PROMPT_FOR_TEXT}`,
        },
        {
          role: 'user',
          content: `Тема: ${dto.topic}
        Ключевые слова: ${dto.keywords}`,
        },
      ],
    });
    
    return response.data.choices[0].message.content;
  }

  async getImage(text: string) {
    const promptForImage = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${this.PROMPT_FOR_IMAGE}`,
        },
        {
          role: 'user',
          content: `Post text: ${text['text']}`,
        },
      ],
    })

    const response = await this.openAi.createImage({
      prompt: `digital art for ${promptForImage.data.choices[0].message.content}`,
      n: 1,
      size: "1024x1024",
    });
    return response.data.data[0].url;
  }
}

