import { NG_VALIDATORS } from '@angular/forms';
import { BooksAddEditTitleCustomValidator } from '@app/apps/app/module/books/ui';
import {
  DISABLED_MATCHER_PROVIDER,
  HIDDEN_MATCHER_PROVIDER,
  REQUIRED_MATCHER_PROVIDER,
} from '@ng-dynamic-forms/core';

export const APP_DYNAMIC_FORMS_PROVIDERS = [
  DISABLED_MATCHER_PROVIDER,
  HIDDEN_MATCHER_PROVIDER,
  REQUIRED_MATCHER_PROVIDER,

  {
    provide: NG_VALIDATORS,
    useValue: BooksAddEditTitleCustomValidator,
    multi: true,
  },

  // {
  //   provide: DYNAMIC_VALIDATORS,
  //   useValue: new Map<string, Validator | ValidatorFactory>([
  //     ['BooksAddEditTitleCustomValidator', BooksAddEditTitleCustomValidator],
  //   ])
  // },
];
