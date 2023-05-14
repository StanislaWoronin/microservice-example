import { PostResponse } from './post.response';
import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@libs/shared/response';

@ObjectType()
export class PaginatedPosts extends Paginated(PostResponse) {}
