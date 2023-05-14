import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPaginationType<T = unknown> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export function Paginated<T = unknown>(
  classRef: Type<T>,
): Type<IPaginationType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginationType<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    offset: number;

    @Field(() => Int)
    total: number;
  }

  return PaginatedType as Type<IPaginationType<T>>;
}
