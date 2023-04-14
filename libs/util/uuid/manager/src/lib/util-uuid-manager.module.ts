import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilUuidManagerService } from './service/util-uuid-manager.service';

@NgModule({
  imports: [CommonModule],
  providers: [UtilUuidManagerService],
})
export class UtilUuidManagerModule {}
