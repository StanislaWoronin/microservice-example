import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { GetPostsQueryHandler } from '@libs/post/application-services/queries/get-posts/get-posts.query-handler';
import { GetPostQueryHandler } from '@libs/post/application-services/queries/get-post/get-post.query-handler';

// Queries
export * from './get-post/get-post.query';
export * from './get-posts/get-post.query';

// Query handlers
export * from './get-post/get-post.query-handler';
export * from './get-posts/get-posts.query-handler';

export const POST_QUERIES_HANDLER: Type<IQueryHandler>[] = [
  GetPostQueryHandler,
  GetPostsQueryHandler,
];
