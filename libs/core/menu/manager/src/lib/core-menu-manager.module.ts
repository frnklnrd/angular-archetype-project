import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UtilLoggerManagerModule } from '@app/util/logger/manager';
import { NgxsModule } from '@ngxs/store';
import { MenuManagerService } from './service/menu-manager.service';

@NgModule({
  imports: [CommonModule, NgxsModule, UtilLoggerManagerModule],
  providers: [MenuManagerService],
})
export class CoreMenuManagerModule {}
