import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreUiModalDefaultModule } from '@app/core/ui/modal/default';
import {
  AvatarModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MenuFlowStatusComponent } from './component/menu-flow-status/menu-flow-status.component';
import { MenuLanguageChooserComponent } from './component/menu-language-chooser/menu-language-chooser.component';
import { MenuQuickLinksComponent } from './component/menu-quick-links/menu-quick-links.component';
import { MenuQuickNotificationsComponent } from './component/menu-quick-notifications/menu-quick-notifications.component';
import { MenuSidebarMainComponent } from './component/menu-sidebar-main/menu-sidebar-main.component';
import { MenuUserDropdownComponent } from './component/menu-user-dropdown/menu-user-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    // ------------------------
    AvatarModule,
    DropdownModule,
    GridModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    CardModule,
    ModalModule,
    PopoverModule,
    TooltipModule,
    HeaderModule,
    // ------------------------
    CoreUiModalDefaultModule,
  ],
  declarations: [
    MenuLanguageChooserComponent,
    MenuFlowStatusComponent,
    MenuQuickLinksComponent,
    MenuQuickNotificationsComponent,
    MenuUserDropdownComponent,
    MenuSidebarMainComponent,
  ],
  exports: [
    MenuLanguageChooserComponent,
    MenuFlowStatusComponent,
    MenuQuickLinksComponent,
    MenuQuickNotificationsComponent,
    MenuUserDropdownComponent,
    MenuSidebarMainComponent,
  ],
})
export class CoreLayoutBlockDefaultModule {}
