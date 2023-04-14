import { InjectionToken } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';

export const CORE_AUTH_PROVIDER_OAUTH2_KEYLOACK_AUTH_CONFIG =
  new InjectionToken<AuthConfig>(
    'CORE_AUTH_PROVIDER_OAUTH2_KEYLOACK_AUTH_CONFIG'
  );
