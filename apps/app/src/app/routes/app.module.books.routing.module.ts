import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AppsAppModuleBooksFeatureModule,
  BookAddComponent,
  BooksListComponent,
} from '@app/apps/app/module/books/feature';
// import { checkIsAllowed } from '@app/core/auth/guard/default';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: BooksListComponent,
    data: {
      title: $localize`Books List`,
      enabled: true,
      flowData: {
        context: '',
        module: 'books',
        action: 'list',
        step: '',
      },
    },
    /*canActivate: [() => checkIsAllowed(['ROLE_USER'])],*/
  },
  {
    path: 'add/:step',
    component: BookAddComponent,
    data: {
      title: $localize`Book Add`,
      enabled: true,
      flowData: {
        context: '',
        module: 'books',
        action: 'add',
        step: '',
        steps: ['step1', 'step2', 'step3'],
      },
    },
    /*canActivate: [() => checkIsAllowed(['ROLE_USER'])],*/
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AppsAppModuleBooksFeatureModule],
  exports: [RouterModule],
})
export class AppModuleBooksRoutingModule {}
