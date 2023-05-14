import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { UpdatePostDto as IUpdatePostDto } from '@libs/post/application-services/commands/dto';

export class UpdatePostDto implements IUpdatePostDto {
  @ApiProperty({
    description: 'Post ID',
    type: String,
    example: randomStringGenerator(),
  })
  @IsUUID()
  authorId: string;

  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: 'Post message', type: String })
  @IsOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'Post title', type: String })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;
}
