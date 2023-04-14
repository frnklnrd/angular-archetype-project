import { AuthTokenModel } from './auth-token.model';
import { AuthUserDataModel } from './auth-user-data.model';
import { AuthUserPermissionsModel } from './auth-user-permissions.model';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthFullDataModel {
  payload: any | null;
  token: AuthTokenModel | null;
  userData: AuthUserDataModel | null;
  userPermissions: AuthUserPermissionsModel | null;
  extraData: any | null;
}
