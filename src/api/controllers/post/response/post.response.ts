import { ApiProperty } from '@nestjs/swagger';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { IPost } from '@libs/post';

export class PostResponse implements Omit<IPost, 'isPublished'> {
  @ApiProperty({
    description: 'Author ID',
    type: String,
    example: randomStringGenerator(),
  })
  authorId: string;

  @ApiProperty({
    description: 'Date when post was be created',
    type: String,
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    description: 'Author ID',
    type: String,
    example: randomStringGenerator(),
  })
  id: string;

  @ApiProperty({
    description: 'Post message',
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'Post title',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'Author ID',
    type: String,
    example: new Date(Date.now() + 200000).toISOString(),
  })
  updatedAt: string;
}
