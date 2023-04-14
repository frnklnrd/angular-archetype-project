/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthFullDataModel, AuthProviderType } from '@app/core/auth/api';
import { AuthManagerService } from '@app/core/auth/manager/api';

export interface AuthProviderService {
  setAuthManagerService(authManager: AuthManagerService): void;

  getProviderKey(): AuthProviderType | string;

  init(data: any): Promise<boolean>;

  isEnabled(): boolean;

  setIsDefault(
    isDefault: boolean,
    defaultAuthData: any | null
  ): Promise<boolean>;

  login(data?: any): Promise<boolean | undefined>;

  logout(data?: any): Promise<boolean>;

  refreshToken(data?: any): Promise<boolean>;

  getAuthFullDataFromPayload(payload?: any): AuthFullDataModel;
}
