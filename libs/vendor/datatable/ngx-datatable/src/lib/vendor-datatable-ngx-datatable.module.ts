import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule, NgxDatatableModule],
  exports: [NgxDatatableModule],
})
export class VendorDatatableNgxDatatableModule {}
