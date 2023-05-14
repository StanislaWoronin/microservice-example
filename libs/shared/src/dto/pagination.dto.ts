import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

//@ArgsType()
export class PaginationDto {
  //@ApiPropertyOptional({ description: 'Page number', type: String })
  @IsOptional()
  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  //@Field(() => Int, { description: 'Page number' })
  offset = 0;

  //@ApiPropertyOptional({ description: 'Page size', type: String })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  @IsPositive()
  //@Field(() => Int, { description: 'Page size' })
  limit = 15;
}
