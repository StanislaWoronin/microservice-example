import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger } from '@nestjs/common';
import { DeletePostCommand } from '@libs/post/application-services/commands/delete-post/delete-post.command';
import { PostRepository } from '@libs/post/providers';

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler
  implements ICommandHandler<DeletePostCommand, boolean>
{
  private readonly logger = new Logger(DeletePostCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ id }: DeletePostCommand): Promise<boolean> {
    const existPost = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null;
    });
    if (!existPost) {
      throw new BadRequestException(`Post by ${id} not found!`);
    }
    const isPostDelete = await this.postRepository.delete(id).catch((err) => {
      throw new Error(err);
    });
    return isPostDelete;
  }
}
