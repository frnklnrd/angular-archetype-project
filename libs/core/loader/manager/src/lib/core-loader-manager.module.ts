import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UtilLoggerManagerModule } from '@app/util/logger/manager';
import { UtilUuidManagerModule } from '@app/util/uuid/manager';
import { NgxsModule } from '@ngxs/store';
import { LoadingIndicatorManagerService } from './services/loading-indicator-manager.service';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule,
    UtilLoggerManagerModule,
    UtilUuidManagerModule,
  ],
  providers: [LoadingIndicatorManagerService],
})
export class CoreLoaderManagerModule {}
