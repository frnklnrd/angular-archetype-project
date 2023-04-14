import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AppsAppModuleHomeFeatureModule,
  HomeComponent,
} from '@app/apps/app/module/home/feature';
// import { checkIsAllowed } from '@app/core/auth/guard/default';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: $localize`Home`,
      enabled: true,
      flowData: {
        context: '',
        module: '',
        action: '',
        step: ''
      }
    },
    /*canActivate: [() => checkIsAllowed([])],*/
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AppsAppModuleHomeFeatureModule,
  ],
  exports: [RouterModule],
})
export class AppHomeRoutingModule {}
