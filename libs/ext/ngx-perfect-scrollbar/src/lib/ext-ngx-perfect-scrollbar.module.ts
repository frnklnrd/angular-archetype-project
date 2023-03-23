import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from './perfect-scrollbar.module';

@NgModule({
  imports: [CommonModule, PerfectScrollbarModule],
  exports: [CommonModule, PerfectScrollbarModule],
})
export class ExtNgxPerfectScrollbarModule {}
