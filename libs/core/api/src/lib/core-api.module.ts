import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilCodeValidationModule } from '@app/util/code/validation';
import { UtilLoggerManagerModule } from '@app/util/logger/manager';

@NgModule({
  imports: [CommonModule, UtilCodeValidationModule, UtilLoggerManagerModule],
})
export class CoreApiModule {}
