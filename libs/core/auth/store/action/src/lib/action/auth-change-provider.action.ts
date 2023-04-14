import { AuthProviderModel } from '@app/core/auth/api';

export class AuthChangeProviderAction {
  static readonly type = '[AUTH] Change Provider';

  constructor(public provider: AuthProviderModel | null) {}
}
