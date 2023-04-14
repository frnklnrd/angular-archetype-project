import { InjectionToken } from '@angular/core';
import { IAppEnvConfig } from '../model/app-env-vars.model';

export const APP_ENV = new InjectionToken<IAppEnvConfig>('APP_ENV');
