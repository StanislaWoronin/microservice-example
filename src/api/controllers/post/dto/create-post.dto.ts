import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto as ICreatePostDto } from '@libs/post/application-services/commands/dto';

export class CreatePostDto implements ICreatePostDto {
  @IsUUID()
  authorId: string;

  @ApiProperty({ description: 'Post message', type: String })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ description: 'Post title', type: String })
  @IsString()
  @IsNotEmpty()
  title: string;
}
