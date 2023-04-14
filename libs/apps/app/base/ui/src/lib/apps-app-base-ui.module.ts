import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CalloutModule,
  CardModule,
  GridModule,
  SharedModule,
} from '@coreui/angular';
import { NavbarBoxComponent } from './component/box/navbar-box/navbar-box.component';
import { PageBoxComponent } from './component/box/page-box/page-box.component';
import { PanelBoxComponent } from './component/box/panel-box/panel-box.component';

@NgModule({
  imports: [CommonModule, CalloutModule, CardModule, GridModule, SharedModule],
  declarations: [PanelBoxComponent, PageBoxComponent, NavbarBoxComponent],
  providers: [],
  exports: [PanelBoxComponent, PageBoxComponent, NavbarBoxComponent],
})
export class AppsAppBaseUiModule {}
