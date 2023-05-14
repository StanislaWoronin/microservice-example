import { PaginationDto } from '@libs/shared/dto';

export class GetPostsQuery {
  constructor(public readonly pagination: PaginationDto) {}
}
