/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ExtAngularDisableBrowserBackButtonModule } from '@app/ext/angular-disable-browser-back-button';

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
  /*
  @Autowired(LoggerService)
  private logger!: LoggerService;

  @Autowired(Router)
  private router!: Router;

  @Autowired(ActivatedRoute)
  private activatedRoute!: ActivatedRoute;
  */

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
    // -----------------------------
    // this.initCheckAbstractFeatureComponentImplementation();
    // -----------------------------
  }

  /*
  private initCheckAbstractFeatureComponentImplementation(): void {
    this.logger.debug(
      'AppFlowConfigModule',
      'initCheckAbstractFeatureComponentImplementation'
    );

    const production: boolean = APP_ENV_CONFIG.production;

    this.router.events.subscribe((evt: Event) => {
      if (evt instanceof NavigationEnd) {
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
          this.logger.warn('AppCodeConfigModule', error);
          // throwError(error);
        }
      }
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  */
}
