import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VendorBootstrapNgxBootstrapModule } from '@app/vendor/bootstrap/ngx-bootstrap';
import { ButtonModule, ModalModule } from '@coreui/angular';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalAlertComponent } from './component/modal-alert/modal-alert.component';
import { ModalConfirmComponent } from './component/modal-confirm/modal-confirm.component';
import { ModalManagerService } from './service/modal-manager.service';

@NgModule({
  declarations: [ModalAlertComponent, ModalConfirmComponent],
  providers: [BsModalService, ModalManagerService],
  imports: [
    CommonModule,
    // ------------------------
    ButtonModule,
    ModalModule,
    // ------------------------
    VendorBootstrapNgxBootstrapModule,
  ],
  exports: [],
})
export class UiModalDefaultModule {}
