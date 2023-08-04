import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { AiDto } from './dto';

@Injectable()
export class AiService {
  constructor(private config: ConfigService) {}
  private readonly OPEN_AI_KEY = this.config.get('OPEN_AI_KEY');
  private readonly PROMPT_FOR_POST = this.config.get('PROMPT_FOR_POST');
  private readonly PROMPT_FOR_IMAGE = this.config.get('PROMPT_FOR_IMAGE');
  private readonly PROMPT_FOR_KEYWORDS = this.config.get('PROMPT_FOR_KEYWORDS');
  private readonly PROMPT_FOR_IDEAS = this.config.get('PROMPT_FOR_IDEAS');
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
          content: `${this.PROMPT_FOR_POST}`,
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
    console.log(JSON.stringify(text));
    const promptForImage = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${this.PROMPT_FOR_IMAGE}`,
        },
        {
          role: 'user',
          content: `Post text: ${JSON.stringify(text)}`,
        },
      ],
    });
    //${promptForImage.data.choices[0].message.content}
    const response = await this.openAi.createImage({
      prompt: `digital art for ${promptForImage.data.choices[0].message.content}`,
      n: 1,
      size: '1024x1024',
    });
    return response.data.data[0].url;
  }

  async getIdeas(category: string) {
    const promptForKeywords = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${this.PROMPT_FOR_KEYWORDS}`,
        },
        {
          role: 'user',
          content: `Категория: ${JSON.stringify(category)}`,
        },
      ],
    });
    const idea = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${this.PROMPT_FOR_IDEAS}`,
        },
        {
          role: 'user',
          content: `Ключевые слова: ${promptForKeywords.data.choices[0].message.content}`,
        },
      ],
    });
    return idea.data.choices[0].message.content;
  }
}
