/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractComponent } from '@app/core/api';
import { marker as _i18n } from '@biesbjerg/ngx-translate-extract-marker';
import {
  AND_OPERATOR,
  AUTOCOMPLETE_OFF,
  DynamicCheckboxModel,
  DynamicDatePickerModel,
  DynamicFormArrayModel,
  DynamicFormGroupModel,
  DynamicFormLayout,
  DynamicFormModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicSelectModel,
  MATCH_DISABLED,
  MATCH_HIDDEN,
} from '@ng-dynamic-forms/core';
import { BooksAddEditTitleCustomValidator } from '../../validator/books-form.validators';

@Component({
  selector: 'app-book-add-edit-form',
  templateUrl: './book-add-edit-form.component.html',
  styleUrls: ['./book-add-edit-form.component.scss'],
})
export class BookAddEditFormComponent
  extends AbstractComponent
  implements OnInit, OnDestroy, OnChanges
{
  formModel: DynamicFormModel = [];

  formLayout!: DynamicFormLayout;

  @Input() markAllAsReadOnly: boolean = false;

  @Input() editable: boolean = true;

  @Output() formGroupCreated: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    this.formLayout = this.getFormLayout();

    this.formModel = this.getFormModel(this.editable);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // -------------------------------------------------------------------------

  protected getFormModel(editable = true): DynamicFormModel {
    return [
      new DynamicInputModel(
        {
          id: 'title',
          label: _i18n('app.books.form.title'),
          maxLength: 35,
          placeholder: 'Sample input',
          readOnly: !editable,
          validators: {
            required: null,
            minLength: 5,
            maxLength: 25,
            titleValidator: {
              name: BooksAddEditTitleCustomValidator.name,
              args: null,
            },
          },
          disabled: !editable,
          autoComplete: AUTOCOMPLETE_OFF,
          list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
          additional: {
            translate_label: true,
          },
        },
        {
          element: {
            host: 'dynamic-form-control-custom-host-t col-sm-6 col-xs-12',
            // container: 'dynamic-form-control-custom-container',
            // label: 'dynamic-form-control-custom-label',
            // control: 'dynamic-form-control-custom-control',
            //
            // children: 'dynamic-form-control-custom-children',
            // errors: 'dynamic-form-control-custom-errors',
            // group: 'dynamic-form-control-custom-group',
            // hint: 'dynamic-form-control-custom-hint',
            // option: 'dynamic-form-control-custom-option',
          },
          grid: {
            host: 'dynamic-form-control-custom-host-t col-sm-6 col-xs-12',
            // container: 'dynamic-form-control-custom-container-t',
            // label: 'dynamic-form-control-custom-label-t',
            // control: 'dynamic-form-control-custom-control-t',
            // children: 'dynamic-form-control-custom-children-t',
            // errors: 'dynamic-form-control-custom-errors-t alert alert-danger mt-2',
            // group: 'dynamic-form-control-custom-group-t',
            // hint: 'dynamic-form-control-custom-hint-t',
            // option: 'dynamic-form-control-custom-option-t',
          },
        }
      ),

      new DynamicRadioGroupModel<string>(
        {
          id: 'sampleRadioGroup',
          label: 'Sample Radio Group',
          options: [
            {
              label: 'Option 1',
              value: 'option-1',
            },
            {
              label: 'Option 2',
              value: 'option-2',
            },
            {
              label: 'Option 3',
              value: 'option-3',
            },
          ],
          value: 'option-3',
          disabled: !editable,
        },
        {
          element: {
            host: 'dynamic-form-control-custom-host-t col-sm-6 col-xs-12',
            // container: 'dynamic-form-control-custom-container',
            // label: 'dynamic-form-control-custom-label',
            // control: 'dynamic-form-control-custom-control',
            //
            // children: 'dynamic-form-control-custom-children',
            // errors: 'dynamic-form-control-custom-errors',
            // group: 'dynamic-form-control-custom-group',
            // hint: 'dynamic-form-control-custom-hint',
            // option: 'dynamic-form-control-custom-option',
          },
          grid: {
            host: 'dynamic-form-control-custom-host-t col-sm-6 col-xs-12',
            // container: 'dynamic-form-control-custom-container-t',
            // label: 'dynamic-form-control-custom-label-t',
            // control: 'dynamic-form-control-custom-control-t',
            // children: 'dynamic-form-control-custom-children-t',
            // errors: 'dynamic-form-control-custom-errors-t alert alert-danger mt-2',
            // group: 'dynamic-form-control-custom-group-t',
            // hint: 'dynamic-form-control-custom-hint-t',
            // option: 'dynamic-form-control-custom-option-t',
          },
        }
      ),

      new DynamicSelectModel<string>({
        id: 'select1',
        label: 'Select 1',
        options: [
          {
            label: 'Option 1',
            value: 'option-1',
          },
          {
            label: 'Option 2',
            value: 'option-2',
          },
          {
            label: 'Option 3',
            value: 'option-3',
          },
        ],
        value: 'option-1',
        disabled: !editable,
      }),

      new DynamicSelectModel<string>({
        id: 'select2',
        label: 'Select 2',
        options: [
          {
            label: 'Option 1',
            value: 'option-1',
          },
          {
            label: 'Option 2',
            value: 'option-2',
          },
          {
            label: 'Option 3',
            value: 'option-3',
          },
        ],
        value: 'option-1',
        disabled: !editable,
        relations: [
          {
            match: MATCH_DISABLED,
            operator: AND_OPERATOR,
            when: [{ id: 'select1', value: 'option-2' }],
          },
        ],
      }),

      new DynamicSelectModel<string>({
        id: 'select3',
        label: 'Select 3',
        options: [
          {
            label: 'Option 1',
            value: 'option-1',
          },
          {
            label: 'Option 2',
            value: 'option-2',
          },
          {
            label: 'Option 3',
            value: 'option-3',
          },
        ],
        value: 'option-1',
        disabled: !editable,
        relations: [
          {
            match: MATCH_HIDDEN,
            operator: AND_OPERATOR,
            when: [{ id: 'select1', value: 'option-3' }],
          },
        ],
      }),

      new DynamicInputModel(
        {
          id: '',
          inputType: 'hidden',
          readOnly: true,
          disabled: true,
        },
        {
          element: {
            host: 'col-sm-12 col-xs-12',
            container: 'hidden d-none',
            control: 'hidden d-none',
          },
          grid: {
            host: 'dynamic-form-control-custom-host-t col-sm-12 col-xs-12',
            container: 'hidden d-none',
            control: 'hidden d-none',
          },
        }
      ),

      // TODO

      new DynamicInputModel({
        id: 'maskedInput',
        label: 'Masked Input',
        mask: '', // [ '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ],
      }),

      new DynamicInputModel({
        id: 'mySlider',
        label: 'My Slider',
        min: 0,
        max: 10,
        inputType: 'range',
        disabled: !editable,
        readOnly: !editable,
      }),

      new DynamicInputModel({
        id: 'myFile',
        label: 'My File',
        inputType: 'file',
        disabled: !editable,
        readOnly: !editable,
      }),

      new DynamicInputModel({
        id: 'myDate',
        label: 'My Date',
        inputType: 'date',
        disabled: !editable,
        readOnly: !editable,
      }),

      new DynamicDatePickerModel({
        id: 'myDate2',
        label: 'My Date 2',
        disabled: !editable,
        readOnly: !editable,
      }),

      new DynamicInputModel(
        {
          id: '',
          inputType: 'hidden',
          readOnly: true,
          disabled: true,
        },
        {
          element: {
            host: 'col-sm-12 col-xs-12',
            container: 'hidden d-none',
            control: 'hidden d-none',
          },
          grid: {
            host: 'dynamic-form-control-custom-host-t col-sm-12 col-xs-12',
            container: 'hidden d-none',
            control: 'hidden d-none',
          },
        }
      ),

      new DynamicCheckboxModel({
        id: 'sampleCheckbox',
        label: 'I do agree',
        disabled: !editable,
      },
      {
        element: {
          host: 'col-sm-12 col-xs-12 elem-abc1 mt-2',
          container: 'elem-abc2',
          control: 'elem-abc3',
        },
        grid: {
          host: 'dynamic-form-control-custom-host-t col-sm-12 col-xs-12 grid-abc1',
          container: 'grid-abc2',
          control: 'grid-abc3',
        },
      }),

      new DynamicFormGroupModel({
        id: 'fullName',
        legend: 'Name',
        group: [
          new DynamicInputModel({
            id: 'firstName',
            label: 'First Name',
            readOnly: false, // always editable
            disabled: false,
            validators: {
              required: null,
              minLength: 3,
              maxLength: 25,
            },
          }),
          new DynamicInputModel({
            id: 'lastName',
            label: 'Last Name',
            readOnly: true, // always readonly
            disabled: true,
          }),
        ],
      }),

      new DynamicFormGroupModel({
        id: 'myAddress',
        legend: 'Address',
        group: [
          new DynamicInputModel({
            id: 'street',
            label: 'Street',
            readOnly: false, // always editable
            disabled: false,
            validators: {
              required: null,
              minLength: 3,
              maxLength: 50,
            },
          }),
          new DynamicInputModel({
            id: 'zipCode',
            label: 'Zip Code',
            readOnly: true, // always readonly
            disabled: true,
          }),
        ],
      }),

      new DynamicFormArrayModel({
        id: 'myFormArray',
        initialCount: 3,
        groupFactory: () => {
          return [
            new DynamicInputModel({
              id: 'myInput',
              label: 'My Input',
              validators: {
                required: null,
                minLength: 3,
                maxLength: 25,
              },
            }),

            new DynamicInputModel({
              id: 'myInput2',
              label: 'My Input 2',
              validators: {
                required: null,
                minLength: 3,
                maxLength: 25,
              },
            }),
          ];
        },
      }),

      new DynamicFormArrayModel({
        id: 'myFormArray2',
        label: 'My Array 2',
        initialCount: 2,
        groupFactory: () => {
          return [
            new DynamicInputModel({
              id: 'myInput',
              label: 'My Input',
              validators: {
                required: null,
                minLength: 3,
                maxLength: 25,
              },
            }),

            new DynamicInputModel({
              id: 'myInput2',
              label: 'My Input 2',
              validators: {
                required: null,
                minLength: 3,
                maxLength: 25,
              },
            }),
          ];
        },
      }),
    ];
  }

  protected getFormLayout(): DynamicFormLayout {
    return {
      sampleInput: {
        element: {
          // host: 'dynamic-form-control-custom-host',
          // container: 'dynamic-form-control-custom-container',
          // label: 'dynamic-form-control-custom-label',
          // control: 'dynamic-form-control-custom-control',
          //
          // children: 'dynamic-form-control-custom-children',
          // errors: 'dynamic-form-control-custom-errors',
          // group: 'dynamic-form-control-custom-group',
          // hint: 'dynamic-form-control-custom-hint',
          // option: 'dynamic-form-control-custom-option',
        },
        grid: {
          host: 'dynamic-form-control-custom-host-t col-sm-6 col-xs-12',
          container: 'dynamic-form-control-custom-container-t',
          label: 'dynamic-form-control-custom-label-t',
          control: 'dynamic-form-control-custom-control-t',
          children: 'dynamic-form-control-custom-children-t',
          errors:
            'dynamic-form-control-custom-errors-t alert alert-danger mt-2',
          group: 'dynamic-form-control-custom-group-t',
          hint: 'dynamic-form-control-custom-hint-t',
          option: 'dynamic-form-control-custom-option-t',
        },
      },

      anotherSampleRadioGroup: {
        element: {
          label: 'control-label',
        },
        grid: {
          control: 'col-sm-3 col-xs-12',
          label: 'col-sm-3 col-xs-12',
        },
      },
    };
  }

  // -------------------------------------------------------------------------

  public onFormGroupCreated(event: any): void {
    this.formGroupCreated.emit(event as FormGroup);
  }
}
