import { InjectionToken } from '@angular/core';

import { AuthManagerService } from '../service/auth-manager.service';

export const AUTH_MANAGER_SERVICE = new InjectionToken<AuthManagerService>(
  'AUTH_MANAGER_SERVICE'
);
