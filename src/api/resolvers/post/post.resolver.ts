import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostResponse } from '../responses/post.response';
import { plainToInstance } from 'class-transformer';
import { PaginatedPosts } from '../../controllers/post/response';
import { CreatePostInput, UpdatePostInput } from '../input';
import { UseGuards } from '@nestjs/common';
import { GqlGuard } from '../../../../libs/auth/src/guards/gql.guard';
import {
  GqlCurrentUser,
  ICurrentUser,
  Public,
} from '../../../../libs/auth/src';
import { PostFacade } from '@libs/post/application-services';
import { PaginationDto } from '@libs/shared/dto';

@UseGuards(GqlGuard)
@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}

  @Public()
  @Query(() => PostResponse, { name: 'post' })
  async getPostById(@Args('id') id: string) {
    return this.postFacade.queries.getPost(id);
  }

  @Public()
  @Query(() => PaginatedPosts, { name: 'post' })
  async getAllPost(@Args() paginationDto: PaginationDto) {
    const pagination = plainToInstance(PaginationDto, paginationDto);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [data, count] = this.postFacade.queries.getPosts(pagination);
    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @Mutation(() => PostResponse)
  async createPost(
    @GqlCurrentUser() currentUser: ICurrentUser,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostInput,
      authorId: currentUser.userId,
    });
  }

  @Mutation(() => PostResponse)
  async setPublishedPost(@Args('id') id: string) {
    return this.postFacade.commands.setPublisherPost(id);
  }

  @Mutation(() => PostResponse)
  async updatePost(
    @GqlCurrentUser() currentUser: ICurrentUser,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePostInput,
      authorId: currentUser.userId,
    });
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
