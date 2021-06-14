export interface PaginatedDto<TQuery, TData> {
    count: number;
  
    query: TQuery;
  
    results: TData[];
  }