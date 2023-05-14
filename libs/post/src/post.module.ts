import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@libs/entities';
import { POST_COMMAND_HANDLER } from '@libs/post/application-services/commands';
import { POST_QUERIES_HANDLER } from '@libs/post/application-services/queries';
import { POST_EVENTS_HANDLER } from '@libs/post/application-services/events';
import { PostFacade } from '@libs/post/application-services';
import { postFacadeFactory } from '@libs/post/providers/post-facade.factory';
import { PostRepository } from '@libs/post/providers';
import { PostAdapter } from '@libs/post/providers/post.adapter';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostEntity])],
  providers: [
    ...POST_COMMAND_HANDLER,
    ...POST_QUERIES_HANDLER,
    ...POST_EVENTS_HANDLER,
    {
      provide: PostFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: postFacadeFactory,
    },
    {
      provide: PostRepository,
      useClass: PostAdapter,
    },
  ],
  exports: [PostFacade],
})
export class PostModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}
  onModuleInit() {
    this.commandBus.register(POST_COMMAND_HANDLER);
    this.queryBus.register(POST_QUERIES_HANDLER);
    this.eventBus.register(POST_EVENTS_HANDLER);
  }
}
