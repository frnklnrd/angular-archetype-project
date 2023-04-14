import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UtilUuidManagerModule } from '@app/util/uuid/manager';
import { LoadingIndicatorState } from './state/loading-indicator.state';

@NgModule({
  imports: [CommonModule, UtilUuidManagerModule],
  providers: [LoadingIndicatorState],
})
export class CoreLoaderStoreStateModule {}
