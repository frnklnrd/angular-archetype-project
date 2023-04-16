/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, inject } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { AbstractFeatureComponent } from '@app/core/ddd/api';
import { ExtAngularDisableBrowserBackButtonModule } from '@app/ext/angular-disable-browser-back-button';
import { LoggerService } from '@app/util/logger/manager';
import { filter } from 'rxjs';
import { APP_ENV_CONFIG } from '../_env/app.env.loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //-----------------
    // Back Button Disabled
    //-----------------
    ExtAngularDisableBrowserBackButtonModule,
    // ----------------
  ],
  providers: [],
  exports: [],
})
export class AppCodeConfigModule {
  private logger: LoggerService = inject<LoggerService>(LoggerService);

  private router: Router = inject<Router>(Router);

  private activatedRoute: ActivatedRoute =
    inject<ActivatedRoute>(ActivatedRoute);

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppCodeConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppCodeConfigModule is already loaded. Import it in the main config module only.'
      );
    }

    this.init();
  }

  private init(): void {
    this.logger.console.debug('AppCodeConfigModule', 'init');

    this.logger.console.debug(
      'AppFlowConfigModule',
      'initCheckAbstractFeatureComponentImplementation'
    );

    const production: boolean = APP_ENV_CONFIG.production;

    this.router.events
      .pipe(filter((evt) => evt instanceof NavigationEnd))
      .subscribe((evt: Event) => {
        let route = this.activatedRoute.firstChild;
        let child = route;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
            route = child;
          } else {
            child = null;
          }
        }
        const component: any | null = route?.component;
        if (
          !production &&
          component &&
          !(component.prototype instanceof AbstractFeatureComponent)
        ) {
          const error =
            'Component [' +
            component.prototype.constructor.name +
            '] must inherit from [AbstractFeatureComponent]';
          this.logger.console.warn('AppCodeConfigModule', error);
          // throwError(error);
        }
      });

    /*
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    */
  }
}
