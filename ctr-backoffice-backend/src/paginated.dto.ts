import { ApiProperty } from "@nestjs/swagger";

export class PaginatedDto<TQuery, TData> {
    @ApiProperty()
    count: number;
  
    @ApiProperty()
    query: TQuery;
  
    @ApiProperty()
    results: TData[];
  }