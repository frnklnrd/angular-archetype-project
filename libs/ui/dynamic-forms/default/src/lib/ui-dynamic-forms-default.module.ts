import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VendorDynamicFormNgDynamicFormsModule } from '@app/vendor/dynamic-form/ng-dynamic-forms';
import { VendorTranslationNgxTranslateModule } from '@app/vendor/translation/ngx-translate';
import { DynamicFormsComponent } from './component/dynamic-forms/dynamic-forms.component';

@NgModule({
  imports: [
    CommonModule,
    VendorTranslationNgxTranslateModule,
    VendorDynamicFormNgDynamicFormsModule,
  ],
  declarations: [DynamicFormsComponent],
  providers: [],
  exports: [DynamicFormsComponent, VendorDynamicFormNgDynamicFormsModule],
})
export class UiDynamicFormsDefaultModule {}
