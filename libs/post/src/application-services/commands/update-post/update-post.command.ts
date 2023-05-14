import { UpdatePostDto } from '@libs/post/application-services/commands/dto';

export class UpdatePostCommand {
  constructor(public readonly post: UpdatePostDto) {}
}
