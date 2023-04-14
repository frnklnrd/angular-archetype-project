import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlowManagerService } from './service/flow-manager.service';

@NgModule({
  imports: [CommonModule],
  providers: [FlowManagerService],
})
export class CoreFlowManagerModule {}
