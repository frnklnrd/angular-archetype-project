import {
  AuthPayloadModel,
  AuthProviderModel,
  AuthTokenModel,
  AuthUserDataModel,
  AuthUserPermissionsModel,
} from '@app/core/auth/api';

export interface AuthDataModel {
  provider: AuthProviderModel | null;
  payload: AuthPayloadModel | null;
  token: AuthTokenModel | null;
  userData: AuthUserDataModel | null;
  userPermissions: AuthUserPermissionsModel | null;

  extraData: unknown | null;

  loadedFromStore: boolean;
  logged: boolean;
}
