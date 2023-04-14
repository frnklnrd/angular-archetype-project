import { AuthPayloadModel } from '@app/core/auth/api';

export class AuthChangePayloadAction {
  static readonly type = '[AUTH] Change Payload';

  constructor(public payload: AuthPayloadModel | null) {}
}
