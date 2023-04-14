import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreLoaderManagerModule } from '@app/core/loader/manager';
import { CoreTranslationManagerModule } from '@app/core/translation/manager';
import { UiNotificationDefaultModule } from '@app/ui/notification/default';

import { UtilCodeValidationModule } from '@app/util/code/validation';
import { UtilLoggerManagerModule } from '@app/util/logger/manager';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // ---------------------------------
    CoreLoaderManagerModule,
    CoreTranslationManagerModule,
    UtilLoggerManagerModule,
    UtilCodeValidationModule,
    // ---------------------------------
    UiNotificationDefaultModule,
    // ---------------------------------
  ],
  providers: [],
  exports: [
    CommonModule,
    HttpClientModule,
    // ---------------------------------
    CoreLoaderManagerModule,
    CoreTranslationManagerModule,
    UtilLoggerManagerModule,
    UtilCodeValidationModule,
    // ---------------------------------
    UiNotificationDefaultModule,
    // ---------------------------------
  ],
})
export class AppsAppCoreModule {}
