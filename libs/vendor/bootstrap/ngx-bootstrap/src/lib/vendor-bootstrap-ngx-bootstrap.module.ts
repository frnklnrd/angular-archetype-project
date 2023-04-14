import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BsDatepickerConfig,
  BsDatepickerInlineConfig,
  BsDatepickerModule,
  BsDaterangepickerConfig,
  BsDaterangepickerInlineConfig,
} from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [CommonModule, BsDatepickerModule.forRoot()],
  providers: [
    BsDatepickerConfig,
    BsDatepickerInlineConfig,
    BsDaterangepickerConfig,
    BsDaterangepickerInlineConfig,
  ],
  exports: [BsDatepickerModule],
})
export class VendorBootstrapNgxBootstrapModule {}
