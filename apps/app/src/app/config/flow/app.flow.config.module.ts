/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, inject } from '@angular/core';
import {
  CoreFlowManagerModule,
  FlowManagerService,
} from '@app/core/flow/manager';
import { LoggerService } from '@app/util/logger/manager';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ----------------
    // App Flow
    // ----------------
    CoreFlowManagerModule,
    // ----------------
  ],
  providers: [],
  exports: [CoreFlowManagerModule],
})
export class AppFlowConfigModule {
  private logger: LoggerService = inject<LoggerService>(LoggerService);

  private flow: FlowManagerService =
    inject<FlowManagerService>(FlowManagerService);

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppFlowConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppFlowConfigModule is already loaded. Import it in the main config module only.'
      );
    }

    this.init();
  }

  private init(): void {
    // -----------------------------
    this.initFlowConfiguration();
    // -----------------------------
    // this.initAccessVerificationToDeniedUrl();
    // -----------------------------
  }

  private initFlowConfiguration(): void {
    this.logger.console.debug('AppFlowConfigModule', 'initFlowConfiguration');
    this.flow.init();
  }
}
