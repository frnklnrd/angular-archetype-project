import { AuthUserPermissionsModel } from '@app/core/auth/api';

export class AuthChangeUserPermissionsAction {
  static readonly type = '[AUTH] Change User Permissions';

  constructor(public userPermissions: AuthUserPermissionsModel | null) {}
}
