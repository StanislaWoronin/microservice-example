import { IPost } from '@libs/post/domain/post.interface';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { PostServices } from '@libs/post/domain/services';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  validate,
  validateSync,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { DomainError } from '@libs/errors';

export class PostAggregate extends PostServices implements IPost {
  @IsUUID()
  id: string;

  @IsUUID()
  authorId: string = randomStringGenerator();

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  title = new Date().toISOString();

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt = new Date().toISOString();

  @IsBoolean()
  @Exclude()
  isPublished = false;

  private constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate();
    Object.assign(_post, post); // соединяет переданный и созданный пост
    _post.updatedAt = post?.id ? new Date().toISOString() : post.updatedAt;
    const errors = validateSync(_post, { whitelist: true });
    if (!!errors.length) {
      throw new DomainError(errors, 'Post not valid');
    }
    return _post;
  }
}
