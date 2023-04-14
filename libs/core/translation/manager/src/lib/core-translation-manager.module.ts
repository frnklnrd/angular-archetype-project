import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UtilLoggerManagerModule } from '@app/util/logger/manager';
import { VendorTranslationNgxTranslateModule } from '@app/vendor/translation/ngx-translate';
import { NgxsModule } from '@ngxs/store';
import { TranslationManagerService } from './service/translation-manager.service';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule,
    UtilLoggerManagerModule,
    VendorTranslationNgxTranslateModule,
  ],
  providers: [TranslationManagerService],
  exports: [VendorTranslationNgxTranslateModule],
})
export class CoreTranslationManagerModule {}
