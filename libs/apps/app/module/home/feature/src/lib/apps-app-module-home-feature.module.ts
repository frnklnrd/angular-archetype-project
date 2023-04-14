import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsAppUiSharedModule } from '@app/apps/app/base/api';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  imports: [CommonModule, AppsAppUiSharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class AppsAppModuleHomeFeatureModule {}
