import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsAppUiSharedModule } from '@app/apps/app/base/api';
import { UiDatatableDefaultModule } from '@app/ui/datatable/default';
import { UiDynamicFormsDefaultModule } from '@app/ui/dynamic-forms/default';
import { BookAddEditFormComponent } from './components/book-add-edit-form/book-add-edit-form.component';
import { BooksTableComponent } from './components/books-table/books-table.component';
import { BooksTableSettingsHandler } from './handler/books-table-settings.handler';
import { BookAuthorsPipe } from './pipe/book-authors.pipe';
import { BookPricePipe } from './pipe/book-price.pipe';
import { BookPublishedPipe } from './pipe/book-published.pipe';
import { BookRatingPipe } from './pipe/book-rating.pipe';
import { BookThumbnailPipe } from './pipe/book-thumbnail.pipe';

@NgModule({
  imports: [
    CommonModule,
    AppsAppUiSharedModule,
    UiDatatableDefaultModule,
    UiDynamicFormsDefaultModule,
  ],
  declarations: [
    // ----------------------------------------------
    BooksTableComponent,
    BookAddEditFormComponent,
    // BookDetailFormComponent,
    // BookDeleteFormComponent,
    // ----------------------------------------------
    BookThumbnailPipe,
    BookAuthorsPipe,
    BookRatingPipe,
    BookPricePipe,
    BookPublishedPipe,
    // ----------------------------------------------
  ],
  providers: [
    BooksTableSettingsHandler,
    // ----------------------------------------------
    BookThumbnailPipe,
    BookAuthorsPipe,
    BookAuthorsPipe,
    BookRatingPipe,
    BookPricePipe,
    BookPublishedPipe,
    // ----------------------------------------------
    DatePipe,
    // I18nDatePipe,
    CurrencyPipe,
    // ----------------------------------------------
  ],
  exports: [
    BooksTableComponent,
    BookAddEditFormComponent,
    // BookDetailFormComponent,
    // BookDeleteFormComponent,
  ],
})
export class AppsAppModuleBooksUiModule {}
