import { Field, ID, InputType } from '@nestjs/graphql';
import { UpdatePostDto } from '@libs/post/application-services/commands/dto';

@InputType()
export class UpdatePostInput implements UpdatePostDto {
  @Field(() => ID)
  id: string;

  authorId: string;

  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  title: string;
}
