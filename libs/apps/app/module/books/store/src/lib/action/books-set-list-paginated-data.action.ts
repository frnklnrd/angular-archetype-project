import { BooksPaginatedDataModel } from '../model/books-paginated-data.model';

export class BooksSetListPaginatedDataAction {
  static readonly type = '[APP-BOOKS] Set List Paginated Data';

  constructor(public data: BooksPaginatedDataModel) {}
}
