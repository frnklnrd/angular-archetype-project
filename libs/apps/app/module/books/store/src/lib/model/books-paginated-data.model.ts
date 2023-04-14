/* eslint-disable @typescript-eslint/no-explicit-any */

import { Book } from "@app/vendor/api-client/book-monkey-v4";

export interface BooksPaginatedDataModel {
  items: Book[];
  total: number;
  page: number;
  pageSize: number;
  sorts: any[];
  selected: Book[];
}
