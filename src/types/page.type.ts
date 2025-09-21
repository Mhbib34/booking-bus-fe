export type Page<T> = {
  data: T[];
  paging: {
    size: number;
    total_pages: number;
    current_page: number;
  };
};
