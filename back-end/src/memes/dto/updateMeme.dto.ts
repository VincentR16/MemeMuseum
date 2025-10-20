import { IsString } from 'class-validator';

export class UpdateMemeDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;
}
