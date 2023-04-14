import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VendorNotificationAngularNotifierModule } from '@app/vendor/notification/angular-notifier';
import { UiNotificationService } from './service/ui-notification.service';

@NgModule({
  imports: [CommonModule, VendorNotificationAngularNotifierModule],
  declarations: [],
  providers: [UiNotificationService],
  exports: [VendorNotificationAngularNotifierModule],
})
export class UiNotificationDefaultModule {}
