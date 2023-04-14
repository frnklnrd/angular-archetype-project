import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooksDataState } from './state/books-data.state';

@NgModule({
  imports: [CommonModule],
  providers: [BooksDataState],
})
export class AppsAppModuleBooksStoreModule {}
