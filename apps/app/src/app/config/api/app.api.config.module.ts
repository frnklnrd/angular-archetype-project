import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoggerService } from '@app/util/logger/manager';
import {
  BASE_PATH as API_BOOK_MONKEY_BASE_PATH,
  VendorApiClientBookMonkeyV4Module,
} from '@app/vendor/api-client/book-monkey-v4';
import {
  BASE_PATH as API_LARAVEL_BASE_PATH,
  VendorApiClientLaravel9Module,
} from '@app/vendor/api-client/laravel9';
import {
  BASE_PATH as API_SUITECRM_BASE_PATH,
  VendorApiClientSuitecrm7V8Module,
} from '@app/vendor/api-client/suitecrm7-v8';
import { APP_API_CONFIG } from './app.api.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    // ----------------
    // App Api
    // ----------------
    VendorApiClientBookMonkeyV4Module,
    VendorApiClientSuitecrm7V8Module,
    VendorApiClientLaravel9Module,
  ],
  providers: [
    {
      provide: API_BOOK_MONKEY_BASE_PATH,
      useValue: APP_API_CONFIG.book_monkey_v4_api_base_path,
    },
    {
      provide: API_SUITECRM_BASE_PATH,
      useValue: APP_API_CONFIG.suitecrm7_v8_api_base_path,
    },
    {
      provide: API_LARAVEL_BASE_PATH,
      useValue: APP_API_CONFIG.laravel9_api_base_path,
    },
  ],
  exports: [],
})
export class AppApiConfigModule {
  logger: LoggerService = inject<LoggerService>(LoggerService);

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppApiConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppApiConfigModule is already loaded. Import it in the main config module only.'
      );
    }
    this.init();
  }

  private init(): void {
    this.logger.console.debug('AppApiConfigModule', 'init');
  }
}
