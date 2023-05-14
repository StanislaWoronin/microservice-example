import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GetPostQuery } from '@libs/post/application-services/queries/get-post/get-post.query';
import { PostAggregate } from '@libs/post';
import { PostRepository } from '@libs/post/providers';

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler
  implements IQueryHandler<GetPostQuery, PostAggregate>
{
  private readonly logger = new Logger(GetPostQueryHandler.name);
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ id }: GetPostQuery): Promise<PostAggregate> {
    const existPost = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as PostAggregate;
    });
    return existPost;
  }
}
