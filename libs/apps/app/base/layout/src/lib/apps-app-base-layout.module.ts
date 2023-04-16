import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  AppsAppUiCoreModule,
  AppsAppUiSharedModule,
} from '@app/apps/app/base/api';
import { MenuLanguageChooserComponent } from './component/blocks/menu-language-chooser/menu-language-chooser.component';
import { MenuQuickLinksComponent } from './component/blocks/menu-quick-links/menu-quick-links.component';
import { MenuQuickNotificationsComponent } from './component/blocks/menu-quick-notifications/menu-quick-notifications.component';
import { MenuUserDropdownComponent } from './component/blocks/menu-user-dropdown/menu-user-dropdown.component';

import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './component/containers';
import { MenuFlowStatusComponent } from './component/blocks/menu-flow-status/menu-flow-status.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // --------------------------------
    AppsAppUiCoreModule,
    // --------------------------------
    AppsAppUiSharedModule,
    // --------------------------------
  ],
  declarations: [
    DefaultFooterComponent,
    DefaultHeaderComponent,
    DefaultLayoutComponent,
    // --------------------------------

    MenuQuickLinksComponent,
    MenuLanguageChooserComponent,
    MenuQuickNotificationsComponent,
    MenuUserDropdownComponent,
    MenuFlowStatusComponent,
  ],
  providers: [],
  exports: [DefaultLayoutComponent, AppsAppUiCoreModule],
})
export class AppsAppBaseLayoutModule {}
