import { InjectionToken } from '@angular/core';
import { AuthProviderService } from '../service/auth-provider.service';

export const AUTH_PROVIDER_SERVICE = new InjectionToken<AuthProviderService>(
  'AUTH_PROVIDER_SERVICE'
);
