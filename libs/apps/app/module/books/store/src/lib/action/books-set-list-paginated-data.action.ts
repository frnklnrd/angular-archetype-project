import { BooksPaginatedDataModel } from '../model/books-paginated-data.model';

export class BooksSetListPaginatedDataAction {
  static readonly type = '[BOOKS] Set List Paginated Data';

  constructor(public data: BooksPaginatedDataModel) {}
}
