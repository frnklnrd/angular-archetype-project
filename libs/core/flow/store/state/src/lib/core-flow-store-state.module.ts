import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowDataState } from './state/flow-data.state';

@NgModule({
  imports: [CommonModule],
  providers: [FlowDataState],
})
export class CoreFlowStoreStateModule {}
