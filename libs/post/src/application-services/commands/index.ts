import { ICommandHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { CreatePostCommandHandler } from '@libs/post/application-services/commands/create-post/create-post.command-handler';
import { UpdatePostCommandHandler } from '@libs/post/application-services/commands/update-post/update-post.command-handler';
import { SetPublishedCommandHandler } from '@libs/post/application-services/commands/set-published/set-published.command-handler';
import { DeletePostCommandHandler } from '@libs/post/application-services/commands/delete-post/delete-post.command-handler';

// Commands
export * from './create-post/create-post.command';
export * from './update-post/update-post.command';
export * from './set-published/set-published.command';
export * from './delete-post/delete-post.command';

// Commands handler
export * from './create-post/create-post.command-handler';
export * from './update-post/update-post.command-handler';
export * from './set-published/set-published.command-handler';
export * from './delete-post/delete-post.command-handler';

export const POST_COMMAND_HANDLER: Type<ICommandHandler>[] = [
  CreatePostCommandHandler,
  UpdatePostCommandHandler,
  SetPublishedCommandHandler,
  DeletePostCommandHandler,
];
