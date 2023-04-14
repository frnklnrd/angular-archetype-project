import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppsAppUiSharedModule } from '@app/apps/app/base/api';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DocsCalloutComponent } from './component/docs/docs-callout/docs-callout.component';
import { DocsExampleComponent } from './component/docs/docs-example/docs-example.component';
import { DocsLinkComponent } from './component/docs/docs-link/docs-link.component';
import { WidgetsBrandComponent } from './component/widgets/widgets-brand/widgets-brand.component';
import {
  ChartSample,
  WidgetsDropdownComponent,
} from './component/widgets/widgets-dropdown/widgets-dropdown.component';
import { WidgetsEComponent } from './component/widgets/widgets-e/widgets-e.component';
import { WidgetsComponent } from './component/widgets/widgets/widgets.component';

@NgModule({
  imports: [CommonModule, RouterModule, AppsAppUiSharedModule],
  declarations: [
    DashboardComponent,

    WidgetsComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent,

    ChartSample,
    WidgetsEComponent,
    DocsExampleComponent,
    DocsLinkComponent,
    DocsCalloutComponent,
  ],
  exports: [DashboardComponent],
})
export class AppsAppModuleDashboardFeatureModule {}
