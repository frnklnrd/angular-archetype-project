import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooksFacadeService } from './service/books-facade.service';

@NgModule({
  imports: [CommonModule],
  providers: [BooksFacadeService],
})
export class AppsAppModuleBooksDomainModule {}
