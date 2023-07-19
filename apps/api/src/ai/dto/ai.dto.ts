import { IsNotEmpty, IsString } from 'class-validator';

export class AiDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  keywords: string;
}
