import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { APP_DYNAMIC_FORMS_PROVIDERS } from './app.dynamic-forms.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ----------------
    NgxMaskModule.forRoot({}),
  ],
  providers: [APP_DYNAMIC_FORMS_PROVIDERS],
  exports: [],
})
export class AppDynamicFormsConfigModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppDynamicFormsConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppDynamicFormsConfigModule is already loaded. Import it in the main config module only.'
      );
    }
  }
}
