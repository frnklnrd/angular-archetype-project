/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  AUTH_MANAGER_SERVICE,
  AuthManagerService,
} from '@app/core/auth/manager/api';
import { CoreAuthManagerDefaultModule } from '@app/core/auth/manager/default';
import { CoreAuthProviderMockedUserDataModule } from '@app/core/auth/provider/mocked-user-data';
import { CoreAuthProviderOauth2KeycloakModule } from '@app/core/auth/provider/oauth2-keycloak';
import { CoreAuthProviderOauth2SocialGoogleModule } from '@app/core/auth/provider/oauth2-social-google';
import { CoreAuthProviderSuitecrm7ApiV8Module } from '@app/core/auth/provider/suitecrm7-api-v8';
import {
  AuthChangeTokenAction,
  AuthDoLoginSuccessfullyAction,
  AuthDoLogoutSuccessfullyAction,
} from '@app/core/auth/store/action';
import { LoggerService } from '@app/util/logger/manager';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseAuthorizationErrorInterceptor } from '@app/core/auth/interceptor/default';
import { CoreAuthProviderLaravel9Module } from '@app/core/auth/provider/laravel9';
import { CoreAuthProviderOauth2SocialFacebookModule } from '@app/core/auth/provider/oauth2-social-facebook';
import { FlowManagerService } from '@app/core/flow/manager';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { APP_AUTH_CONFIG } from './app.auth.config';

const authProvidersModules: any[] = [];

if (APP_AUTH_CONFIG.providers.mocked_user_data.enabled) {
  authProvidersModules.push(CoreAuthProviderMockedUserDataModule);
}

if (APP_AUTH_CONFIG.providers.keycloak.enabled) {
  authProvidersModules.push(CoreAuthProviderOauth2KeycloakModule);
}

if (APP_AUTH_CONFIG.providers.social.facebook.enabled) {
  authProvidersModules.push(CoreAuthProviderOauth2SocialFacebookModule);
}

if (APP_AUTH_CONFIG.providers.social.google.enabled) {
  authProvidersModules.push(CoreAuthProviderOauth2SocialGoogleModule);
}

if (APP_AUTH_CONFIG.providers.suitecrm7_v8.enabled) {
  authProvidersModules.push(CoreAuthProviderSuitecrm7ApiV8Module);
}

if (APP_AUTH_CONFIG.providers.laravel9.enabled) {
  authProvidersModules.push(CoreAuthProviderLaravel9Module);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ----------------
    // App Auth Manager
    // ----------------
    CoreAuthManagerDefaultModule,
    // ----------------
    // App Auth Providers
    ...authProvidersModules,
    // ----------------
    // App Auth Guards
    // CoreAuthGuardDefaultModule,
    // ----------------
  ],
  providers: [
    // ----------------
    // App Auth Interceptors
    // ----------------
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseAuthorizationErrorInterceptor,
      multi: true,
    },
  ],
  exports: [
    // CoreAuthGuardDefaultModule
  ],
})
export class AppAuthConfigModule {
  private logger: LoggerService = inject<LoggerService>(LoggerService);

  private auth: AuthManagerService =
    inject<AuthManagerService>(AUTH_MANAGER_SERVICE);

  private flow: FlowManagerService =
    inject<FlowManagerService>(FlowManagerService);

  private store: Store = inject<Store>(Store);

  private actions$: Actions = inject<Actions>(Actions);

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppAuthConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppAuthConfigModule is already loaded. Import it in the main config module only.'
      );
    }

    this.init();
  }

  private init(): void {
    this.logger.console.debug('AppAuthConfigModule', 'init');

    this.actions$
      .pipe(ofActionDispatched(AuthDoLoginSuccessfullyAction))
      .subscribe((action: AuthDoLoginSuccessfullyAction) => {
        if (action.loggedIn) {
          this.logger.console.debug(
            'AppAuthConfigModule',
            'Logged -> In !!!',
            action.loggedIn
          );

          this.flow.closeAll(true).then(() => {
            this.goToDefaultUserPageAfterLogin();
          });
        }
      });

    this.actions$
      .pipe(ofActionDispatched(AuthChangeTokenAction))
      .subscribe((action: AuthChangeTokenAction) => {
        if (action.token) {
          this.logger.console.debug(
            'AppAuthConfigModule',
            'Token -> Updated !!!',
            action.token
          );
        }
      });

    this.actions$
      .pipe(ofActionDispatched(AuthDoLogoutSuccessfullyAction))
      .subscribe((action: AuthDoLogoutSuccessfullyAction) => {
        if (action.loggedOut) {
          this.logger.console.debug(
            'AppAuthConfigModule',
            'Logged -> Out !!!',
            action.loggedOut
          );

          this.flow.closeAll({}, false).then(() => {
            this.goToLogin();
          });
        }
      });

    this.auth.init();
  }

  private goToDefaultUserPageAfterLogin(): void {
    this.logger.console.debug(
      'AppAuthConfigModule',
      'goToDefaultUserPageAfterLogin'
    );

    let route = this.store.selectSnapshot(
      (state) => state.router?.state?.root?.firstChild
    );

    let child = route;

    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
        route = child;
      } else {
        child = null;
      }
    }

    const routeParams = route.params;

    if (routeParams?.redirect) {
      firstValueFrom(
        this.store.dispatch(new Navigate([routeParams?.redirect]))
      ).then((navigated) => {
        if (!navigated) {
          this.logger.console.debug(
            'AppAuthConfigModule',
            'Navigation to [' + routeParams?.redirect + '] Failed!!!'
          );
          this.goToUserHomePageAfterLogin();
        }
      });
    } else {
      this.goToUserHomePageAfterLogin();
    }
  }

  private goToUserHomePageAfterLogin(): void {
    this.logger.console.debug(
      'AppAuthConfigModule',
      'goToUserHomePageAfterLogin'
    );

    this.flow.startAction('', '', '', null, {}, true).then((navigated) => {
      if (!navigated) {
        this.logger.console.debug(
          'AppAuthConfigModule',
          'Navigation to Home Failed!!!'
        );
      }
    });
  }

  private goToLogin(): void {
    this.logger.console.debug('AppAuthConfigModule', 'goToLogin');

    this.flow.startAction('', '', 'login', null, {}, true).then((navigated) => {
      if (!navigated) {
        this.logger.console.debug(
          'AppAuthConfigModule',
          'Navigation to Login Failed!!!'
        );
      }
    });
  }
}
