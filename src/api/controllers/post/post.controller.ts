import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { PostResponse } from './response';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostFacade } from '@libs/post/application-services';
import { PaginationDto } from '@libs/shared/dto';
import { PostAggregate } from '@libs/post';
import { CurrentUser, ICurrentUser, Public } from '../../../../libs/auth/src';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import {
  ApiOkResponsePaginated,
  ResponseWithPagination,
} from '@libs/shared/response';
import { JwtGuard } from '../../../../libs/auth/src/guards/jwt.guard';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      authorId: user.userId,
    });
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiOkResponse({ type: PostResponse })
  @Public()
  @Get(':id')
  getPostById(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getPost(id);
  }

  @ApiOperation({ summary: 'Get all post' })
  @ApiOkResponsePaginated(PostResponse)
  @Public()
  @Get()
  async getAllPost(
    @Query() paginationDto: PaginationDto,
  ): Promise<ResponseWithPagination<PostAggregate>> {
    const pagination = plainToInstance(PaginationDto, paginationDto);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [data, count] = await this.postFacade.queries.getPosts(pagination);
    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Put()
  updatePost(
    @CurrentUser() user: ICurrentUser,
    @Body() updatePost: UpdatePostDto,
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePost,
      authorId: user.userId,
    });
  }

  @ApiOperation({ summary: 'Set status published for post' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Patch(':id')
  setPublished(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublisherPost(id);
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  @Delete(':id')
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
