import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import {
  CreatePostCommand,
  CreatePostCommandHandler,
  DeletePostCommand,
  SetPublishedCommand,
  UpdatePostCommand,
} from '@libs/post/application-services/commands';
import {
  CreatePostDto,
  UpdatePostDto,
} from '@libs/post/application-services/commands/dto';
import {
  GetPostQuery,
  GetPostQueryHandler,
  GetPostsQuery,
  GetPostsQueryHandler,
} from '@libs/post/application-services/queries';
import { PaginationDto } from '@libs/shared/dto';

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  commands = {
    createPost: (post: CreatePostDto) => this.createPost(post),
    updatePost: (post: UpdatePostDto) => this.updatePost(post),
    setPublisherPost: (id: string) => this.setPublisherPost(id),
    deletePost: (id: string) => this.deletePost(id),
  };
  queries = {
    getPost: (id: string) => this.getPost(id),
    getPosts: (pagination: PaginationDto) => this.getPosts(pagination),
  };
  events = {};

  private createPost(post: CreatePostDto) {
    return this.commandBus.execute<
      CreatePostCommand,
      CreatePostCommandHandler['execute']
    >(new CreatePostCommand(post));
  }

  private updatePost(post: UpdatePostDto) {
    return this.commandBus.execute<
      UpdatePostCommand,
      CreatePostCommandHandler['execute']
    >(new UpdatePostCommand(post));
  }

  private setPublisherPost(id: string) {
    return this.commandBus.execute<
      SetPublishedCommand,
      CreatePostCommandHandler['execute']
    >(new SetPublishedCommand(id));
  }

  private deletePost(id: string) {
    return this.commandBus.execute<
      DeletePostCommand,
      CreatePostCommandHandler['execute']
    >(new DeletePostCommand(id));
  }

  private getPost(id: string) {
    return this.queryBus.execute<GetPostQuery, GetPostQueryHandler['execute']>(
      new GetPostQuery(id),
    );
  }

  private getPosts(pagination: PaginationDto) {
    return this.queryBus.execute<
      GetPostsQuery,
      GetPostsQueryHandler['execute']
    >(new GetPostsQuery(pagination));
  }
}
