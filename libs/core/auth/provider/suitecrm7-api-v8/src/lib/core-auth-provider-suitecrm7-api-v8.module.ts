import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AUTH_PROVIDER_SERVICE } from '@app/core/auth/provider/api';
import { VendorApiClientSuitecrm7V8Module } from '@app/vendor/api-client/suitecrm7-v8';
import { SuiteCRM7V8AuthProviderService } from './service/suitecrm7-v8-auth-provider.service';

@NgModule({
  imports: [CommonModule, VendorApiClientSuitecrm7V8Module],
  providers: [
    {
      provide: AUTH_PROVIDER_SERVICE,
      useExisting: SuiteCRM7V8AuthProviderService,
      multi: true,
    },
    SuiteCRM7V8AuthProviderService,
  ],
})
export class CoreAuthProviderSuitecrm7ApiV8Module {}
