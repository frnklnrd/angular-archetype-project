import { Book } from '@app/vendor/api-client/book-monkey-v4';

export class BooksSetListResponseDataAction {
  static readonly type = '[APP-BOOKS] Set List Response Data';

  constructor(public data: Book[], public resetError: boolean = true) {}
}
