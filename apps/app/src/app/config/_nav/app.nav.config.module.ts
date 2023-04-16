/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { APP_LAYOUT_NAV_DATA } from '@app/apps/app/base/layout';

import { LoggerService } from '@app/util/logger/manager';
import { navItems } from './app.nav.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_LAYOUT_NAV_DATA,
      useValue: navItems,
    },
  ],
  exports: [],
})
export class AppNavConfigModule {
  logger: LoggerService = inject<LoggerService>(LoggerService);

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppNavConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppNavConfigModule is already loaded. Import it in the main config module only.'
      );
    }
    this.init();
  }

  private init(): void {
    this.logger.console.debug('AppNavConfigModule', 'init');
  }
}
