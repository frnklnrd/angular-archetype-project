import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsNGxBootstrapUIModule } from '@ng-dynamic-forms/ui-ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    DynamicFormsNGxBootstrapUIModule,
    TextMaskModule,
  ],
  providers: [],
  exports: [
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    DynamicFormsNGxBootstrapUIModule,
    TextMaskModule,
  ],
})
export class VendorDynamicFormNgDynamicFormsModule {}
