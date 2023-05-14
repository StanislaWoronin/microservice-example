import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { PaginationDto } from '@libs/shared/dto';

export class ResponseWithPagination<T> extends PaginationDto {
  @ApiProperty({ description: 'Page size ', type: Number })
  limit: number;

  @ApiProperty({ description: 'Page number', type: Number })
  offset: number;

  @ApiProperty({ description: 'All data count', type: Number })
  total!: number;

  @ApiProperty({ default: [], isArray: true, items: {} })
  data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(Response, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(Response),
          },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
