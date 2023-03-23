import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonDisableModule } from './public_api';

@NgModule({
  imports: [CommonModule, BackButtonDisableModule],
  exports: [CommonModule, BackButtonDisableModule],
})
export class ExtAngularDisableBrowserBackButtonModule {}
