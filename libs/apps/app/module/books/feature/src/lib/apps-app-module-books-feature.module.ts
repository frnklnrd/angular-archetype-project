import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsAppUiSharedModule } from '@app/apps/app/base/api';
import { AppsAppModuleBooksDomainModule } from '@app/apps/app/module/books/domain';
import { AppsAppModuleBooksUiModule } from '@app/apps/app/module/books/ui';
import { BookAddComponent } from './component/add/book-add.component';
import { BooksListComponent } from './component/list/books-list.component';

@NgModule({
  imports: [
    CommonModule,
    AppsAppUiSharedModule,
    // ---------------------------------------
    AppsAppModuleBooksDomainModule,
    AppsAppModuleBooksUiModule,
    // ---------------------------------------
  ],
  declarations: [BookAddComponent, BooksListComponent],
  exports: [BookAddComponent, BooksListComponent],
})
export class AppsAppModuleBooksFeatureModule {}
