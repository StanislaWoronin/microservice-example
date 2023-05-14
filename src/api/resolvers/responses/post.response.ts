import { IPost } from '@libs/post';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostResponse implements Omit<IPost, 'isPublished'> {
  @Field(() => ID, { description: 'Author ID' })
  authorId: string;
  @Field({ description: 'Date when post was be created' })
  createdAt: string;
  @Field(() => ID, { description: 'Post ID' })
  id: string;
  @Field({ description: 'Post message' })
  message: string;
  @Field({ description: 'Post title' })
  title: string;
  @Field({ description: 'Date when post was be updated' })
  updatedAt: string;
}
