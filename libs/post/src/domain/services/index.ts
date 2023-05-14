import {
  ISetNotPublished,
  SET_NOT_PUBLISHED,
} from '@libs/post/domain/services/set-not-pulished.case';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  ISetPublished,
  SET_PUBLISHED,
} from '@libs/post/domain/services/set-pulished.case';

export class PostServices
  extends AggregateRoot
  implements ISetNotPublished, ISetPublished
{
  setNotPublished = SET_NOT_PUBLISHED;
  setPublished = SET_PUBLISHED;
}
