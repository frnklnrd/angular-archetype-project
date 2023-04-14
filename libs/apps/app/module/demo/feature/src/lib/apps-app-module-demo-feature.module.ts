import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsAppUiSharedModule } from '@app/apps/app/base/api';
import { AlertsComponent } from './component/alerts/alerts.component';
import { DatesComponent } from './component/dates/dates.component';

@NgModule({
  imports: [CommonModule, AppsAppUiSharedModule],
  declarations: [AlertsComponent, DatesComponent],
  exports: [AlertsComponent, DatesComponent],
})
export class AppsAppModuleDemoFeatureModule {}
