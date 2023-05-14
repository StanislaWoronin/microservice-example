import { Field, InputType } from '@nestjs/graphql';
import { CreatePostDto } from '@libs/post/application-services/commands/dto';

@InputType()
export class CreatePostInput implements CreatePostDto {
  authorId: string;

  @Field()
  message: string;

  @Field()
  title: string;
}
