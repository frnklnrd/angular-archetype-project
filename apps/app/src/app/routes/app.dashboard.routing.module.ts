import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AppsAppModuleDashboardFeatureModule,
  DashboardComponent,
} from '@app/apps/app/module/dashboard/feature';
// import { checkIsAllowed } from '@app/core/auth/guard/default';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: $localize`Dashboard`,
      enabled: true,
      flowData: {
        context: '',
        module: 'dashboard',
        action: '',
        step: ''
      },
      animation: 'DashboardPage'
    },
    /*canActivate: [() => checkIsAllowed(['ROLE_USER'])],*/
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AppsAppModuleDashboardFeatureModule,
  ],
  exports: [RouterModule],
})
export class AppDashboardRoutingModule {}
