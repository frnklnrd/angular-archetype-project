/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseDataErrorModel } from '@app/core/ddd/api';
import { Book } from '@app/vendor/api-client/book-monkey-v4';
import { BooksPaginatedDataModel } from './books-paginated-data.model';

export interface BooksDataModel {
  listResponse: ResponseDataErrorModel<Book[], any>;
  listData: BooksPaginatedDataModel;
  editResponse: ResponseDataErrorModel<Book, any>;
  editData: Book | null;
}
