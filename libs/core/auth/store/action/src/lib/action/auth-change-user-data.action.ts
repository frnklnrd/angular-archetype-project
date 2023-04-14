import { AuthUserDataModel } from '@app/core/auth/api';

export class AuthChangeUserDataAction {
  static readonly type = '[AUTH] Change User Data';

  constructor(public userData: AuthUserDataModel | null) {}
}
