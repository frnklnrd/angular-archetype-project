import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { IconModule, IconSetService } from '@coreui/icons-angular';

import {
  ExtNgxPerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from '@app/ext/ngx-perfect-scrollbar';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  DropdownModule,
  FooterModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  imports: [
    CommonModule,
    // ---------------------------------
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonGroupModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    UtilitiesModule,
    SharedModule,
    // ---------------------------------
    ExtNgxPerfectScrollbarModule,
    // ---------------------------------
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
  ],
  exports: [
    // ---------------------------------
    ReactiveFormsModule,
    // ---------------------------------
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonGroupModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    UtilitiesModule,
    SharedModule,
    // ---------------------------------
    ExtNgxPerfectScrollbarModule,
    // ---------------------------------
  ],
})
export class AppsAppUiCoreModule {}
