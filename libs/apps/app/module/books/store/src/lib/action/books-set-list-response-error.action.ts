/* eslint-disable @typescript-eslint/no-explicit-any */

export class BooksSetListResponseErrorAction {
  static readonly type = '[BOOKS] Set List Response Error';

  constructor(public error: any, public resetData: boolean = true) {}
}
