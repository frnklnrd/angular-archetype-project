/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractFeatureComponent } from '@app/core/ddd/api';

@Component({
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent
extends AbstractFeatureComponent
implements OnInit, OnDestroy
{
// ----------------------------------------------------------
// SERVICES
// ----------------------------------------------------------

// ----------------------------------------------------------
// PROPERTIES
// ----------------------------------------------------------

@ViewChild('customModalTpl', { static: true })
customModalTpl!: TemplateRef<any>;

@ViewChild('customAlertNotificationTpl', { static: true })
public customAlertNotificationTpl!: TemplateRef<any>;

// -----------------------------------------------------
// OBSERVABLES
// -----------------------------------------------------

// -----------------------------------------------------

constructor() {
  super();
}

override ngOnInit(): void {
  super.ngOnInit();
}

override ngOnDestroy(): void {
  super.ngOnDestroy();
}

// ---------------------------------------------------------

public openModalFromTemplate(): void {
  this.uiModalOpen(this.customModalTpl);
}

public openAlert(): void {
  this.uiModalOpenAlert(
    'System ERROR',
    '<b>ERROR!!!</b> There is some error in backend.',
    (data) => {
      console.log('Alert Closed!!!');
      console.log(data);
    },
    {},
    {}
  );
}

public openConfirm(): void {
  this.uiModalOpenConfirm(
    'Closing Confirmation',
    '<b>WARNING!!!</b> There are opened process.<br> Do you confirm close them?',
    (data) => {
      console.log('Confirm Closed!!!');
      console.log(data);
    },
    {},
    {}
  );
}

// ---------------------------------------------------------

public showCustomNotification(): void {
  this.uiNotifier.custom({
    id: 'home-custom-notification-id',
    type: 'info',
    message: '<b>INFO</b> All data was updated successfully!!!',
    template: this.customAlertNotificationTpl,
  });
}
}

