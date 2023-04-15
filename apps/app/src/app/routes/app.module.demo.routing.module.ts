import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AlertsComponent,
  AppsAppModuleDemoFeatureModule,
  DatesComponent,
} from '@app/apps/app/module/demo/feature';
// import { checkIsAllowed } from '@app/core/auth/guard/default';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'alerts',
    pathMatch: 'full',
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    data: {
      title: $localize`Alerts`,
      enabled: true,
      flowData: {
        context: '',
        module: 'demo',
        action: 'alerts',
        step: '',
      },
      animation: 'DemoAlertsPage'
    },
    /*canActivate: [() => checkIsAllowed(['ROLE_USER'])],*/
  },
  {
    path: 'dates',
    component: DatesComponent,
    data: {
      title: $localize`Dates`,
      enabled: true,
      flowData: {
        context: '',
        module: 'demo',
        action: 'dates',
        step: '',
      },
      animation: 'DemoDatesPage'
    },
    /*canActivate: [() => checkIsAllowed(['ROLE_USER'])],*/
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AppsAppModuleDemoFeatureModule],
  exports: [RouterModule],
})
export class AppModuleDemoRoutingModule {}
