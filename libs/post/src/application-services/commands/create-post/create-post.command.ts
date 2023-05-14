import { CreatePostDto } from '@libs/post/application-services/commands/dto';

export class CreatePostCommand {
  constructor(public readonly post: CreatePostDto) {}
}
