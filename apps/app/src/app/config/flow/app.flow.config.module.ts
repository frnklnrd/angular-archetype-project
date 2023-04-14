/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, inject } from '@angular/core';
import { NavigationCancel, Router } from '@angular/router';
import {
  CoreFlowManagerModule,
  FlowManagerService,
} from '@app/core/flow/manager';
import { LoggerService } from '@app/util/logger/manager';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

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

  private router: Router = inject<Router>(Router);

  private store: Store = inject<Store>(Store);

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

  private initAccessVerificationToDeniedUrl(): void {
    this.logger.console.debug(
      'AppFlowConfigModule',
      'initAccessVerificationToDeniedUrl'
    );

    const sub: Subscription = this.router.events.subscribe(($event) => {
      // this.logger.console.debug('AppFlowConfigModule', 'router.events', $event);

      if (!($event instanceof NavigationCancel)) {
        return;
      }

      // is trying to access to denied url
      // must be redirected to login or logout

      this.logger.console.debug(
        'AppFlowConfigModule - > NavigationCancel',
        'url',
        $event.url
      );

      sub.unsubscribe();

      const isLogged = this.store.selectSnapshot((state) => state.auth.logged);

      if (isLogged) {
        this.logger.console.debug(
          'AppFlowConfigModule',
          'flow -> startAction',
          'logout'
        );

        this.flow.startAction('', '', 'logout', null, {}, true).then();

        return;
      }

      if (!$event.url.startsWith('/login')) {
        this.logger.console.debug(
          'AppFlowConfigModule',
          'flow -> startAction',
          'login [redirect to: ' + $event.url + ']'
        );

        this.flow
          .startAction(
            '',
            '',
            'login',
            null,
            {
              redirect: $event.url,
            },
            true
          )
          .then();
      }
    });
  }
}
