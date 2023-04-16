/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoggerService } from '@app/util/logger/manager';
import { AppEnvConfigModule } from './_env/app.env.config.module';
import { AppNavConfigModule } from './_nav/app.nav.config.module';
import { AppApiConfigModule } from './api/app.api.config.module';
import { AppAuthConfigModule } from './auth/app.auth.config.module';
import { AppCodeConfigModule } from './code/app.code.config.module';
import { AppCryptoConfigModule } from './crypto/app.crypto.config.module';
import { AppDynamicFormsConfigModule } from './dynamic-forms/app.dynamic-forms.config.module';
import { AppFlowConfigModule } from './flow/app.flow.config.module';
import { AppLoaderConfigModule } from './loader/app.loader.config.module';
import { AppLoggerConfigModule } from './logger/app.logger.config.module';
import { AppMenuConfigModule } from './menu/app.menu.config.module';
import { AppStateConfigModule } from './state/app.state.config.module';
import { AppTranslationConfigModule } from './translation/app.translation.config.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //-----------------
    // Env
    // ----------------
    AppEnvConfigModule,
    //-----------------
    // Code
    // ----------------
    AppCodeConfigModule,
    //-----------------
    // Crypto
    // ----------------
    AppCryptoConfigModule,
    //-----------------
    // Logger
    // ----------------
    AppLoggerConfigModule,
    // ----------------
    // State
    //-----------------
    AppStateConfigModule,
    // ----------------
    // Loader
    // ----------------
    AppLoaderConfigModule,
    // ----------------
    // Translation
    // ----------------
    AppTranslationConfigModule,
    // ----------------
    // Api
    // ----------------
    AppApiConfigModule,
    // ----------------
    // Auth
    // ----------------
    AppAuthConfigModule,
    // ----------------
    // Flow
    // ----------------
    AppFlowConfigModule,
    // ----------------
    // Navigation
    // ----------------
    AppNavConfigModule,
    // ----------------
    // Menu
    // ----------------
    AppMenuConfigModule,
    // ----------------
    // Dynamic Forms
    // ----------------
    AppDynamicFormsConfigModule,
    // ----------------
  ],
  providers: [],
  exports: [],
})
export class AppConfigModule {
  private logger: LoggerService = inject<LoggerService>(LoggerService);

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppConfigModule is already loaded. Import it in the AppModule only.'
      );
    }
    this.init();
  }

  private init(): void {
    this.logger.console.debug('AppConfigModule', 'init');
  }
}
