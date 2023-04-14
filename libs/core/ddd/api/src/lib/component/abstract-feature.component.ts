/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core';
import { AbstractComponent } from '@app/core/api';
import {
  ModalAlertResultModel,
  ModalManagerService,
} from '@app/ui/modal/default';
import { UiNotificationService } from '@app/ui/notification/default';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  template: '',
})
export class AbstractFeatureComponent
  extends AbstractComponent
  implements OnInit, OnDestroy
{
  // -----------------------------------------------------
  // SERVICES
  // -----------------------------------------------------

  private modal: ModalManagerService =
    inject<ModalManagerService>(ModalManagerService);

  private notifier: UiNotificationService = inject<UiNotificationService>(
    UiNotificationService
  );

  // ----------------------------------------------------------
  // PROPERTIES
  // ----------------------------------------------------------

  private modalRef: BsModalRef | null = null;

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

  // ------------------------------------------------------

  public get uiModal(): ModalManagerService {
    return this.modal;
  }

  public uiModalOpen(template: TemplateRef<any>): BsModalRef<any> | null {
    this.modalRef = this.uiModal.openAsModal(template);
    return this.modalRef;
  }

  public uiModalClose(): void {
    this.modalRef?.hide();
  }

  public uiModalOpenAlert(
    title: string,
    body: string,
    onHide: ((result: ModalAlertResultModel) => void) | null = null,
    extraOptions: any = {},
    modalOptions: any | null = {}
  ): void {
    this.uiModal.openAlert(title, body, onHide, extraOptions, modalOptions);
  }

  public uiModalOpenConfirm(
    title: string,
    body: string,
    onHide: ((result: ModalAlertResultModel) => void) | null = null,
    extraOptions: any = {},
    modalOptions: any | null = {}
  ): void {
    this.uiModal.openConfirm(title, body, onHide, extraOptions, modalOptions);
  }

  // ------------------------------------------------------

  public get uiNotifier(): UiNotificationService {
    return this.notifier;
  }

  // ------------------------------------------------------
}
