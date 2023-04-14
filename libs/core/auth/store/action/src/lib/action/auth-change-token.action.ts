import { AuthTokenModel } from '@app/core/auth/api';

export class AuthChangeTokenAction {
  static readonly type = '[AUTH] Change Token';

  constructor(public token: AuthTokenModel | null) {}
}
