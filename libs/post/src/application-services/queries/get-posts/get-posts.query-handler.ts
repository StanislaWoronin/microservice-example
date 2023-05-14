import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GetPostQueryHandler } from '@libs/post/application-services/queries/get-post/get-post.query-handler';
import { GetPostsQuery } from '@libs/post/application-services/queries/get-posts/get-post.query';
import { PostAggregate } from '@libs/post';
import { PostRepository } from '@libs/post/providers';

@QueryHandler(GetPostQueryHandler)
export class GetPostsQueryHandler
  implements IQueryHandler<GetPostsQuery, [PostAggregate[], number]>
{
  private readonly logger = new Logger(GetPostQueryHandler.name);
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    pagination,
  }: GetPostsQuery): Promise<[PostAggregate[], number]> {
    const [data, count] = await this.postRepository
      .findAll(pagination)
      .catch((err) => {
        this.logger.error(err);
        return [[], 0];
      });
    return [data, count] as [PostAggregate[], number];
  }
}
