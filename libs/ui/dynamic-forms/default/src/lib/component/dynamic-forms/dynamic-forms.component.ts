/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { AbstractControlOptions, FormArray, FormGroup } from '@angular/forms';
import { AbstractComponent } from '@app/core/api';
import { TranslationManagerService } from '@app/core/translation/manager';
import { marker as _i18n } from '@biesbjerg/ngx-translate-extract-marker';
import {
  DynamicFormArrayModel,
  DynamicFormControlModel,
  DynamicFormGroupModel,
  DynamicFormLayout,
  DynamicFormModel,
  DynamicFormService,
  DynamicFormValueControlModel,
  DynamicInputModel,
} from '@ng-dynamic-forms/core';
import { DynamicNGxBootstrapFormComponent } from '@ng-dynamic-forms/ui-ngx-bootstrap';
import { BehaviorSubject, Observable, Subject, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ui-dynamic-form-default',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
})
export class DynamicFormsComponent
  extends AbstractComponent
  implements OnInit, OnDestroy, OnChanges
{
  @ViewChild(DynamicNGxBootstrapFormComponent, { static: false })
  formComponent!: DynamicNGxBootstrapFormComponent;

  @Input() formModel!: DynamicFormModel;

  @Input() formLayout!: DynamicFormLayout;

  @Input() formOptions!: AbstractControlOptions;

  @Input() customFormTpl!: TemplateRef<any>;

  @Input() customModelControlsTpl: any[] = [];

  @Input() markAllAsReadOnly: boolean | null = null;

  @Input() keepFormValuesOnChanges: boolean = true;

  @Input() defaultFormLayout = {
    container:
      'dynamic-form-custom-container container-fluid form-control-show-valid-mark form-control-show-invalid-mark',
    group: 'dynamic-form-custom-group row',
  };

  @Input() defaultFormControlLayout: any = {
    element: {
      host: 'dynamic-form-control-custom-host1 col-md-4 col-sm-6 col-xs-12',
      container: 'dynamic-form-control-custom-container1',
      group: 'dynamic-form-control-custom-group1',
      label: 'dynamic-form-control-custom-label1',
      control: 'dynamic-form-control-custom-control1',

      children: 'dynamic-form-control-custom-children1',
      errors: 'dynamic-form-control-custom-errors1 alert alert-danger mt-2',
      hint: 'dynamic-form-control-custom-hint1',
      option: 'dynamic-form-control-custom-option1',
    },
    grid: {
      host: 'dynamic-form-control-custom-host2 col-md-4 col-sm-6 col-xs-12', // col-sm-3 col-xs-12,
      container: 'dynamic-form-control-custom-container2',
      group: 'dynamic-form-control-custom-group2',
      label: 'dynamic-form-control-custom-label2',
      control: 'dynamic-form-control-custom-control2', //  form-control
      children: 'dynamic-form-control-custom-children2',
      errors: 'dynamic-form-control-custom-errors2 alert alert-danger mt-2',
      hint: 'dynamic-form-control-custom-hint2',
      option: 'dynamic-form-control-custom-option2',
    },
  };

  @Input() defaultFormGroupLayout = {
    element: {
      host: 'dynamic-form-control-custom-host3 col-md-12 col-sm-12 col-xs-12',
      container: 'dynamic-form-control-custom-container3',
      group: 'dynamic-form-control-custom-group3',
      label: 'dynamic-form-control-custom-label3',
      control: 'dynamic-form-control-custom-control3 row', // row,

      children:
        'dynamic-form-control-custom-children3 col-md-4 col-sm-6 col-xs-12',
      errors: 'dynamic-form-control-custom-errors3 alert alert-danger mt-2',
      hint: 'dynamic-form-control-custom-hint3',
      option: 'dynamic-form-control-custom-option3',
    },
    grid: {
      host: 'dynamic-form-control-custom-host4 col-md-12 col-sm-12 col-xs-12', // col-sm-12 col-xs-12,
      container: 'dynamic-form-control-custom-container4',
      group: 'dynamic-form-control-custom-group4',
      label: 'dynamic-form-control-custom-label4',
      control: 'dynamic-form-control-custom-control4',
      children:
        'dynamic-form-control-custom-children4 col-md-4 col-sm-6 col-xs-12', // col-sm-3 col-xs-12',
      errors: 'dynamic-form-control-custom-errors4 alert alert-danger mt-2',
      hint: 'dynamic-form-control-custom-hint4',
      option: 'dynamic-form-control-custom-option4',
    },
  };

  @Input() defaultFormArrayLayout = {
    element: {
      host: 'dynamic-form-control-custom-host5 col-md-12 col-sm-12 col-xs-12',
      container: 'dynamic-form-control-custom-container5 mb-0',
      group: 'dynamic-form-control-custom-group5 row',
      label: 'dynamic-form-control-custom-label5',
      control: 'dynamic-form-control-custom-control5',

      children:
        'dynamic-form-control-custom-children5 col-md-4 col-sm-6 col-xs-12',
      errors: 'dynamic-form-control-custom-errors5 alert alert-danger mt-2',
      hint: 'dynamic-form-control-custom-hint5',
      option: 'dynamic-form-control-custom-option5',
    },
    grid: {
      host: 'dynamic-form-control-custom-host6 col-md-12 col-sm-12 col-xs-12', // col-sm-12 col-xs-12,
      container: 'dynamic-form-control-custom-container6 mb-0',
      group: 'dynamic-form-control-custom-group6 row', // row,
      label: 'dynamic-form-control-custom-label6',
      control: 'dynamic-form-control-custom-control6',
      children:
        'dynamic-form-control-custom-children6 col-md-4 col-sm-6 col-xs-12', // col-sm-3 col-xs-12',
      errors: 'dynamic-form-control-custom-errors6 alert alert-danger mt-2',
      hint: 'dynamic-form-control-custom-hint6',
      option: 'dynamic-form-control-custom-option6',
    },
  };

  @Input() showDefaultErrorsTpl: boolean = true;

  @Input() defaultFormErrorsTplLayout = {
    classes: {
      container:
        'dynamic-form-control-custom-errors2 dynamic-form-custom-default-errors-tpl alert alert-danger mt-2',
      message: 'invalid-feedback d-block mb-0',
    },
  };

  @Input() showDefaultArraysEndTpl: boolean = true;

  @Input() defaultFormArrayEndTplLayout = {
    classes: {
      actions_container: 'col-md-4 col-sm-12 col-xs-12 ml-auto',
      actions_label: 'd-none d-md-block',
      actions_text_align: 'text-right',
      actions_btn_insert: 'btn btn-outline-dark me-2',
      actions_btn_insert_icon: 'fa fa-angle-double-down',
      actions_btn_add: 'btn btn-outline-success me-2',
      actions_btn_add_icon: 'fa fa-plus',
      actions_btn_remove: 'btn btn-outline-danger',
      actions_btn_remove_icon: 'fa fa-trash',
    },
    labels: {
      actions_btn_insert: _i18n('ui.dynamicForm.arrays.actions_btn_insert_lbl'),
      actions_btn_add: _i18n('ui.dynamicForm.arrays.actions_btn_add_lbl'),
      actions_btn_remove: _i18n('ui.dynamicForm.arrays.actions_btn_remove_lbl'),
    },
    behaviors: {
      show_actions_btn_insert: true,
      show_actions_btn_add: true,
      show_actions_btn_remove: true,

      disable_action_btn_remove_in_only_item: true,

      show_hr_line_between_items: true,
      show_hr_line_in_last_item: true,
    },
  };

  // ---------------------------------------------------------------------------------------

  @Output() formGroupCreated: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  @Output() formModelUpdated: EventEmitter<DynamicFormModel> =
    new EventEmitter<DynamicFormModel>();

  @Output() formLayoutUpdated: EventEmitter<DynamicFormLayout> =
    new EventEmitter<DynamicFormLayout>();

  _formGroup!: FormGroup;

  _formModel!: DynamicFormModel;

  _formLayout!: DynamicFormLayout;

  _isFormGroupCreated = false;

  _isFormModelUpdated = false;

  _isFormLayoutUpdated = false;

  public dynamicFormService: DynamicFormService =
    inject<DynamicFormService>(DynamicFormService);

  public translation: TranslationManagerService =
    inject<TranslationManagerService>(TranslationManagerService);

  constructor() {
    super();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    let oldFormGroupValue = {};
    if (this._formGroup && this.keepFormValuesOnChanges) {
      oldFormGroupValue = this._formGroup.getRawValue();
    }
    this._isFormModelUpdated = false;
    this._isFormGroupCreated = false;
    this._isFormLayoutUpdated = false;

    this.addSubscription(
      this.customizeFormModel(this.formModel).subscribe((formModelUpdated) => {
        if (formModelUpdated) {
          this._formModel = formModelUpdated;
          this._isFormModelUpdated = true;
          this.formModelUpdated.emit(this._formModel);
          this.formComponentDetectChanges();

          this.addSubscription(
            this.customizeDefaultFormLayout({}, this._formModel).subscribe(
              (formLayoutUpdated) => {
                this._formLayout = Object.assign(
                  {},
                  formLayoutUpdated,
                  this.formLayout
                );
                this._isFormLayoutUpdated = true;
                this.formLayoutUpdated.emit(this._formLayout);
                this.formComponentDetectChanges();
              }
            )
          );

          this.addSubscription(
            this.createFormGroup(this.formModel, this.formOptions).subscribe(
              (formGroupCreated) => {
                if (formGroupCreated) {
                  formGroupCreated.patchValue(oldFormGroupValue);
                  this.addSubscription(
                    this.customizeFormGroup(formGroupCreated).subscribe(
                      (formGroupUpdated) => {
                        if (formGroupUpdated) {
                          this._formGroup = formGroupCreated;
                          this._isFormGroupCreated = true;
                          this.formGroupCreated.emit(this._formGroup);
                          this.formComponentDetectChanges();
                        }
                      }
                    )
                  );
                }
              }
            )
          );
        }
      })
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.addSubscription(
      this.translation.translate.onLangChange.subscribe((lang) => {
        if (this._isFormGroupCreated && this._isFormModelUpdated) {
          this._isFormModelUpdated = false;
          this.customizeFormModelTranslationLogic(this._formModel).subscribe(
            (formModelUpdated) => {
              if (formModelUpdated) {
                this._formModel = formModelUpdated;
                this._isFormModelUpdated = true;
                this.formModelUpdated.emit(this._formModel);
                this.formComponentDetectChanges();
              }
            }
          );
        }
      })
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // ----------------------------------------------------------------

  protected formComponentDetectChanges(): void {
    this.dynamicFormService.detectChanges(this.formComponent);
  }

  // ----------------------------------------------------------------

  protected createFormGroup(
    formModel: DynamicFormModel,
    formOptions?: AbstractControlOptions
  ): Observable<FormGroup | null> {
    const formGroupCreated$: Subject<FormGroup | null> =
      new BehaviorSubject<FormGroup | null>(null);
    if (!formModel) {
      formGroupCreated$.next(null);
    } else {
      const formGroup = this.dynamicFormService.createFormGroup(
        formModel,
        formOptions
      );
      formGroupCreated$.next(formGroup);
    }
    return formGroupCreated$.asObservable().pipe(take(1));
  }

  protected customizeFormGroup(
    formGroup: FormGroup
  ): Observable<FormGroup | null> {
    const formGroupUpdated$: Subject<FormGroup | null> =
      new BehaviorSubject<FormGroup | null>(null);
    if (!formGroup) {
      formGroupUpdated$.next(null);
    } else {
      formGroupUpdated$.next(formGroup);
    }
    return formGroupUpdated$.asObservable().pipe(take(1));
  }

  // ----------------------------------------------------------------

  protected customizeDefaultFormLayout(
    formLayout: DynamicFormLayout,
    formModel: DynamicFormModel
  ): Observable<DynamicFormLayout> {
    const formLayoutCreated$: Subject<DynamicFormLayout> =
      new BehaviorSubject<DynamicFormLayout>({});
    if (!formLayout || !formModel) {
      formLayoutCreated$.next({});
    } else {
      formModel.forEach((controlModel) => {
        const defaultFormControlLayout = JSON.parse(
          JSON.stringify(this.defaultFormControlLayout)
        );
        const defaultFormGroupLayout = JSON.parse(
          JSON.stringify(this.defaultFormGroupLayout)
        );
        const defaultFormArrayLayout = JSON.parse(
          JSON.stringify(this.defaultFormArrayLayout)
        );

        const controlModelLayout = controlModel.layout
          ? controlModel.layout
          : {};

        if (controlModel instanceof DynamicFormValueControlModel) {
          formLayout[controlModel.id] = Object.assign(
            {},
            defaultFormControlLayout,
            controlModelLayout,
            {
              element: Object.assign(
                {},
                defaultFormControlLayout.element,
                controlModelLayout.element
              ),
              grid: Object.assign(
                {},
                defaultFormControlLayout.grid,
                controlModelLayout.grid
              ),
            }
          );
        } else if (controlModel instanceof DynamicFormGroupModel) {
          formLayout[controlModel.id] = Object.assign(
            {},
            defaultFormGroupLayout,
            controlModelLayout,
            {
              element: Object.assign(
                {},
                defaultFormGroupLayout.element,
                controlModelLayout.element
              ),
              grid: Object.assign(
                {},
                defaultFormGroupLayout.grid,
                controlModelLayout.grid
              ),
            }
          );
        } else if (controlModel instanceof DynamicFormArrayModel) {
          formLayout[controlModel.id] = Object.assign(
            {},
            defaultFormArrayLayout,
            controlModelLayout,
            {
              element: Object.assign(
                {},
                defaultFormArrayLayout.element,
                controlModelLayout.element
              ),
              grid: Object.assign(
                {},
                defaultFormArrayLayout.grid,
                controlModelLayout.grid
              ),
            }
          );
        }

        if (
          formLayout[controlModel.id].element &&
          formLayout[controlModel.id].grid
        ) {
          (formLayout[controlModel.id] as any).element.host +=
            ' dynamic-form-control-custom-type-' +
            (controlModel.type as string).toLowerCase();
          (formLayout[controlModel.id] as any).grid.host +=
            ' dynamic-form-control-custom-type-' +
            (controlModel.type as string).toLowerCase();
          if (controlModel instanceof DynamicInputModel) {
            (formLayout[controlModel.id] as any).element.host +=
              ' dynamic-form-control-custom-type-input-' +
              (
                (controlModel as DynamicInputModel).inputType as string
              ).toLowerCase();
            (formLayout[controlModel.id] as any).grid.host +=
              ' dynamic-form-control-custom-type-input-' +
              (
                (controlModel as DynamicInputModel).inputType as string
              ).toLowerCase();
          }
        }
      });
      formLayoutCreated$.next(formLayout);
    }
    return formLayoutCreated$.asObservable().pipe(take(1));
  }

  // ----------------------------------------------------------------

  protected customizeFormModel(
    formModel: DynamicFormModel
  ): Observable<DynamicFormModel | null> {
    const formModelUpdated$: Subject<DynamicFormModel | null> =
      new BehaviorSubject<DynamicFormModel | null>(null);
    if (!formModel) {
      formModelUpdated$.next(null);
    } else {
      this.addSubscription(
        forkJoin([
          // enable and disable control models
          this.customizeFormModelReadOnlyLogic(formModel),
          // customize translatable titles
          this.customizeFormModelTranslationLogic(formModel),
        ]).subscribe(([formModelUpdated1, formModelUpdated2]) => {
          formModelUpdated$.next(formModel);
        })
      );
    }
    return formModelUpdated$.asObservable().pipe(take(1));
  }

  protected customizeFormModelReadOnlyLogic(
    formModel: DynamicFormModel
  ): Observable<DynamicFormModel | null> {
    const formModelUpdated$: Subject<DynamicFormModel | null> =
      new BehaviorSubject<DynamicFormModel | null>(null);
    if (!formModel) {
      formModelUpdated$.next(null);
    } else {
      formModel.forEach((controlModel) => {
        if (controlModel instanceof DynamicFormValueControlModel) {
          if ((controlModel as any).$$_default_disabled === undefined) {
            (controlModel as any).$$_default_disabled = (
              controlModel as any
            ).disabled;
          }
          if ((controlModel as any).$$_default_readonly === undefined) {
            (controlModel as any).$$_default_readonly = (
              controlModel as any
            ).readOnly;
          }
          if (this.markAllAsReadOnly === true) {
            controlModel.disabled = true;
            (controlModel as any).readOnly = true;
          } else {
            controlModel.disabled = (controlModel as any).$$_default_disabled;
            (controlModel as any).readOnly = (
              controlModel as any
            ).$$_default_readonly;
          }
        } else if (controlModel instanceof DynamicFormGroupModel) {
          this.customizeFormModelReadOnlyLogic(
            (controlModel as DynamicFormGroupModel).group
          );
        } else if (controlModel instanceof DynamicFormArrayModel) {
          // TODO
        }
      });
      formModelUpdated$.next(formModel);
    }
    return formModelUpdated$.asObservable().pipe(take(1));
  }

  protected customizeFormModelTranslationLogic(
    formModel: DynamicFormModel
  ): Observable<DynamicFormModel | null> {
    const formModelUpdated$: Subject<DynamicFormModel | null> =
      new BehaviorSubject<DynamicFormModel | null>(null);
    if (!formModel) {
      formModelUpdated$.next(null);
    } else {
      formModel.forEach((controlModel: DynamicFormControlModel) => {
        if (controlModel instanceof DynamicFormValueControlModel) {
          if ((controlModel?.additional as any)?.translate_label === true) {
            if ((controlModel as any).$$_default_label === undefined) {
              (controlModel as any).$$_default_label = controlModel.label
                ? controlModel.label
                : controlModel.id;
            }
            controlModel.label = this.translation.translate.instant(
              (controlModel as any).$$_default_label
            );
          }
        } else if (controlModel instanceof DynamicFormGroupModel) {
          this.customizeFormModelTranslationLogic(
            (controlModel as DynamicFormGroupModel).group
          );
        } else if (controlModel instanceof DynamicFormArrayModel) {
          // TODO
        }
      });
      formModelUpdated$.next(formModel);
    }
    return formModelUpdated$.asObservable().pipe(take(1));
  }

  // ----------------------------------------------------------------

  public onBlur($event: any /*DynamicFormControlEvent*/): void {
    // console.log('onBlur', $event);
  }

  public onChange($event: any /*DynamicFormControlEvent*/): void {
    // console.log('onChange', $event);
  }

  public onFocus($event: any /*DynamicFormControlEvent*/): void {
    // console.log('onFocus', $event);
  }

  public onBsEvent($event: any /*DynamicFormControlEvent*/): void {
    // console.log('bsEvent', $event);
  }

  // ----------------------------------------------------------------

  public thereIsSomeModelControlEndTplWithSameId(
    customModelControlsTpl: any,
    controlModel: any
  ): boolean {
    return customModelControlsTpl.some(
      (tpl: any) => tpl.modelId === controlModel.id && tpl.align !== 'START'
    );
  }

  public thereIsSomeModelControlTplWithSameType(
    customModelControlsTpl: any,
    controlModel: any
  ): boolean {
    return customModelControlsTpl.some(
      (tpl: any) => tpl.modelType === controlModel.type
    );
  }

  public getControlModelErrorsAsArray(controlModel: DynamicFormControlModel) {
    const fieldKey: string = controlModel.id;
    if (
      !this._formGroup?.get(fieldKey) ||
      !this._formGroup?.get(fieldKey)?.errors
    ) {
      return [];
    }
    const errors = this._formGroup?.get(fieldKey)?.errors;
    const errorsArray: any[] = [];
    if (errors) {
      const keys = Object.keys(errors ? errors : {});
      keys.forEach((key, index) => {
        if (key !== 'bsDate') {
          // bsDate duplicates error
          errorsArray.push({
            code: key,
            customError: errors[key]?.customError,
            customMessage: errors[key]?.customMessage,
            params: Object.assign(controlModel, errors[key]),
          });
        }
      });
    }
    return errorsArray;
  }

  public removeFormArrayItem(
    formArrayId: string,
    context: DynamicFormArrayModel,
    index: number
  ) {
    const formArrayModel =
      this.dynamicFormService.findModelById<DynamicFormArrayModel>(
        formArrayId,
        this._formModel
      );
    if (formArrayModel) {
      const formArrayControl =
        this.dynamicFormService.findControlByModel<FormArray>(
          formArrayModel,
          this._formGroup
        );
      if (formArrayControl) {
        this.dynamicFormService.removeFormArrayGroup(
          index,
          formArrayControl,
          context
        );
        this.formComponentDetectChanges();
        // TODO emit item removed
      }
    }
  }

  public insertFormArrayItem(
    formArrayId: string,
    context: DynamicFormArrayModel,
    index: number
  ) {
    const formArrayModel =
      this.dynamicFormService.findModelById<DynamicFormArrayModel>(
        formArrayId,
        this._formModel
      );
    if (formArrayModel) {
      const formArrayControl =
        this.dynamicFormService.findControlByModel<FormArray>(
          formArrayModel,
          this._formGroup
        );
      if (formArrayControl) {
        this.dynamicFormService.insertFormArrayGroup(
          index,
          formArrayControl,
          context
        );
        this.formComponentDetectChanges();
        // TODO emit item added
      }
    }
  }

  public addFormArrayItem(formArrayId: string, context: DynamicFormArrayModel) {
    const formArrayModel =
      this.dynamicFormService.findModelById<DynamicFormArrayModel>(
        formArrayId,
        this._formModel
      );
    if (formArrayModel) {
      const formArrayControl =
        this.dynamicFormService.findControlByModel<FormArray>(
          formArrayModel,
          this._formGroup
        );
      if (formArrayControl) {
        this.dynamicFormService.addFormArrayGroup(formArrayControl, context);
        this.formComponentDetectChanges();
        // TODO emit item added
      }
    }
  }
}
