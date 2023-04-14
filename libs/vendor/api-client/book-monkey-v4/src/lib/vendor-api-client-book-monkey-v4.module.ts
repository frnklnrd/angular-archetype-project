import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from './generated';

@NgModule({
  imports: [CommonModule, ApiModule],
  exports: [ApiModule],
})
export class VendorApiClientBookMonkeyV4Module {}
