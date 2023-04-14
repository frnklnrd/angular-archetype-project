export * from './book.service';
import { BookService } from './book.service';
export * from './notifications.service';
import { NotificationsService } from './notifications.service';
export * from './securebook.service';
import { SecurebookService } from './securebook.service';
export const APIS = [BookService, NotificationsService, SecurebookService];
