/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { UtilLoggerManagerModule } from '@app/util/logger/manager';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { APP_ENV_CONFIG } from '../_env/app.env.loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level:
        NgxLoggerLevel[
          (APP_ENV_CONFIG.production
            ? 'OFF'
            : APP_ENV_CONFIG._VARS.LOGGER_LEVEL) as keyof typeof NgxLoggerLevel
        ],
      serverLogLevel:
        NgxLoggerLevel[
          (APP_ENV_CONFIG.production
            ? 'OFF'
            : APP_ENV_CONFIG._VARS
                .LOGGER_SERVER_LEVEL) as keyof typeof NgxLoggerLevel
        ],
    }),
    UtilLoggerManagerModule,
  ],
  providers: [],
  exports: [],
})
export class AppLoggerConfigModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppLoggerConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppLoggerConfigModule is already loaded. Import it in the main config module only.'
      );
    }
  }
}
