import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AUTH_PROVIDER_SERVICE } from '@app/core/auth/provider/api';
import { VendorApiClientLaravel9Module } from '@app/vendor/api-client/laravel9';
import { Laravel9AuthProviderService } from './service/laravel9-auth-provider.service';

@NgModule({
  imports: [CommonModule, VendorApiClientLaravel9Module],
  providers: [
    {
      provide: AUTH_PROVIDER_SERVICE,
      useExisting: Laravel9AuthProviderService,
      multi: true,
    },
    Laravel9AuthProviderService,
  ],
})
export class CoreAuthProviderLaravel9Module {}
