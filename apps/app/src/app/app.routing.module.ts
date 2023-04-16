import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AppsAppBaseFeatureModule,
  LoginComponent,
  LogoutComponent,
  Page404Component,
  Page500Component,
  RegisterComponent,
} from '@app/apps/app/base/feature';

import {
  checkIsAllowed,
  CoreAuthGuardDefaultModule,
} from '@app/core/auth/guard/default';

import {
  AppsAppBaseLayoutModule,
  DefaultLayoutComponent,
} from '@app/apps/app/base/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },*/
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'books',
        loadChildren: () =>
          import('./routes/app.module.books.routing.module').then(
            (m) => m.AppModuleBooksRoutingModule
          ),
        canMatch: [() => checkIsAllowed(['IS_AUTHENTICATED'])],
      },
      {
        path: 'demo',
        loadChildren: () =>
          import('./routes/app.module.demo.routing.module').then(
            (m) => m.AppModuleDemoRoutingModule
          ),
        canMatch: [() => checkIsAllowed(['IS_AUTHENTICATED'])],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./routes/app.dashboard.routing.module').then(
            (m) => m.AppDashboardRoutingModule
          ),
        canMatch: [() => checkIsAllowed(['IS_AUTHENTICATED'])],
      },
      {
        path: '',
        loadChildren: () =>
          import('./routes/app.home.routing.module').then(
            (m) => m.AppHomeRoutingModule
          ),
        canMatch: [() => checkIsAllowed(['IS_ANONYMOUS', 'IS_AUTHENTICATED'], 'or')],
      },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
      flowData: {
        context: '',
        module: '',
        action: '404',
        step: ''
      }

    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
      flowData: {
        context: '',
        module: '',
        action: '500',
        step: ''
      }

    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
      flowData: {
        context: '',
        module: '',
        action: 'register',
        step: ''
      }

    },
    canActivate: [() => checkIsAllowed(['IS_ANONYMOUS'])],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
      flowData: {
        context: '',
        module: '',
        action: 'login',
        step: ''
      }

    },
    canActivate: [() => checkIsAllowed(['IS_ANONYMOUS'])],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout Page',
      flowData: {
        context: '',
        module: '',
        action: 'logout',
        step: ''
      }

    },
    canActivate: [() => checkIsAllowed(['ROLE_USER'])],
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      onSameUrlNavigation: 'reload',
      // relativeLinkResolution: 'legacy'
    }),
    CoreAuthGuardDefaultModule,
    AppsAppBaseLayoutModule,
    AppsAppBaseFeatureModule,
  ],
  declarations: [],
  exports: [
    RouterModule,
    // AppsAppBaseLayoutModule
  ],
})
export class AppRoutingModule {}
