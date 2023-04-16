import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AUTH_MANAGER_SERVICE } from '@app/core/auth/manager/api';
import { CoreAuthStoreStateModule } from '@app/core/auth/store/state';
import { UtilLoggerManagerModule } from '@app/util/logger/manager';
import { NgxsModule } from '@ngxs/store';
import { DefaultAuthManagerService } from './service/default-auth-manager.service';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule,
    UtilLoggerManagerModule,
    CoreAuthStoreStateModule,
  ],
  providers: [
    {
      provide: AUTH_MANAGER_SERVICE,
      useExisting: DefaultAuthManagerService,
    },
    DefaultAuthManagerService,
  ],
})
export class CoreAuthManagerDefaultModule {
  constructor() {
    //
  }
}
