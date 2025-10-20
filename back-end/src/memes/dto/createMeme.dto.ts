import { IsNotEmpty, IsString } from 'class-validator';

export class createMemeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;
}
