import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CalloutModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  UtilitiesModule,
  WidgetModule,
} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';

import { AppsAppBaseUiModule } from '@app/apps/app/base/ui';
import { CoreTranslationManagerModule } from '@app/core/translation/manager';
import { UiModalDefaultModule } from '@app/ui/modal/default';
import { VendorBootstrapNgxBootstrapModule } from '@app/vendor/bootstrap/ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    // ---------------------------------
    ReactiveFormsModule,
    CoreTranslationManagerModule,
    // ---------------------------------
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ButtonGroupModule,
    ChartjsModule,
    ProgressModule,
    TableModule,
    AvatarModule,
    WidgetModule,
    NavModule,
    NavModule,
    TabsModule,
    UtilitiesModule,
    CalloutModule,
    DropdownModule,
    SharedModule,
    // ---------------------------------
    AppsAppBaseUiModule,
    // ---------------------------------
    UiModalDefaultModule,
    // ---------------------------------
    VendorBootstrapNgxBootstrapModule,
    // ---------------------------------
  ],
  providers: [],
  exports: [
    ReactiveFormsModule,
    CoreTranslationManagerModule,
    // ---------------------------------
    ButtonModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ButtonGroupModule,
    ChartjsModule,
    ProgressModule,
    TableModule,
    AvatarModule,
    WidgetModule,
    NavModule,
    TabsModule,
    UtilitiesModule,
    CalloutModule,
    DropdownModule,
    SharedModule,
    // ---------------------------------
    AppsAppBaseUiModule,
    // ---------------------------------
    UiModalDefaultModule,
    // ---------------------------------
    VendorBootstrapNgxBootstrapModule,
    // ---------------------------------
  ],
})
export class AppsAppUiSharedModule {}
