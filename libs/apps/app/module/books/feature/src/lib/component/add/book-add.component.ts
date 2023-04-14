/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractFeatureComponent } from '@app/core/ddd/api';
import { FlowManagerService } from '@app/core/flow/manager';
import { FlowStatusModel } from '@app/core/flow/store/model';
import { FlowDataState } from '@app/core/flow/store/state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss'],
})
export class BookAddComponent
  extends AbstractFeatureComponent
  implements OnInit, OnDestroy
{
  // ----------------------------------------------------------
  // PROPERTIES
  // ----------------------------------------------------------

  currentFlowStatus!: FlowStatusModel | null;

  step: string | null = 'step1';

  showForm: boolean = true;

  markAllAsReadOnly: boolean = false;

  formEditable: boolean = true;

  formGroup!: FormGroup;

  // ----------------------------------------------------------
  // SERVICES
  // ----------------------------------------------------------

  private flow: FlowManagerService =
    inject<FlowManagerService>(FlowManagerService);

  private route: ActivatedRoute = inject<ActivatedRoute>(ActivatedRoute);

  // ----------------------------------------------------------
  // OBSERVABLES
  // ----------------------------------------------------------

  @Select(FlowDataState.getStatus)
  protected flowStatus$!: Observable<FlowStatusModel>;

  // ----------------------------------------------------------

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.logger.console.debug(this.__classname, 'ngOnInit');

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.step = params.get('step');
      this.logger.console.debug(this.__classname, 'step', this.step);
      switch (this.step) {
        case 'step1':
          this.formEditable = true;
          this.showForm = true;
          break;
        case 'step2':
          this.formEditable = false;
          this.showForm = true;
          break;
        case 'step3':
          this.formEditable = false;
          this.showForm = false;
          break;
        default:
      }
      this.onFormGroupCreated(this.formGroup);
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  goToStep(step: string): void {
    this.flow.startStep('', 'books', 'add', step).then();
  }

  public onFormGroupCreated(form: FormGroup): void {
    this.formGroup = form;
    if (this.formGroup) {
      switch (this.step) {
        case 'step1':
          this.formGroup.enable();
          break;
        case 'step2':
          this.formGroup.disable();
          break;
        default:
      }
    }
  }

  public onClickFormEnabledDisabled(enabled: boolean): void {
    if (this.formGroup) {
      if (enabled) {
        this.formGroup.enable();
      } else {
        this.formGroup.disable();
      }
    }
  }

  public onClickSomeEnabledDisabled(enabled: boolean): void {
    this.markAllAsReadOnly = enabled;
  }
}
