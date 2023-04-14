import { StateToken } from '@ngxs/store';
import { BooksDataModel } from '../model/books-data.model';

export const BOOKS_STATE_TOKEN = new StateToken<BooksDataModel>('books');
