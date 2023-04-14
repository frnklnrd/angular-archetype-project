import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VendorBootstrapNgxBootstrapModule } from '@app/vendor/bootstrap/ngx-bootstrap';
import { VendorDatatableNgxDatatableModule } from '@app/vendor/datatable/ngx-datatable';
import { VendorTranslationNgxTranslateModule } from '@app/vendor/translation/ngx-translate';
import { DefaultDatatableComponent } from './component/default-datatable/default-datatable.component';
import { DefaultDatatableSettingsHandler } from './handler/default-datatable-settings.handler';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VendorBootstrapNgxBootstrapModule,
    VendorTranslationNgxTranslateModule,
    VendorDatatableNgxDatatableModule,
  ],
  declarations: [DefaultDatatableComponent],
  providers: [DefaultDatatableSettingsHandler],
  exports: [DefaultDatatableComponent, VendorDatatableNgxDatatableModule],
})
export class UiDatatableDefaultModule {}
