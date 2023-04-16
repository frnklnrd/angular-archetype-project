/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { inject, NgModule, Optional, SkipSelf } from '@angular/core';

import { APP_ENV } from '@app/apps/app/base/api';
import { LoggerService } from '@app/util/logger/manager';
import { APP_ENV_CONFIG } from './app.env.loader';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_ENV,
      useValue: APP_ENV_CONFIG,
    },
  ],
  exports: [],
})
export class AppEnvConfigModule {
  logger: LoggerService = inject<LoggerService>(LoggerService);

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppEnvConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppEnvConfigModule is already loaded. Import it in the main config module only.'
      );
    }
    this.init();
  }

  private init(): void {
    this.logger.console.debug('AppEnvConfigModule', 'init');
  }
}
