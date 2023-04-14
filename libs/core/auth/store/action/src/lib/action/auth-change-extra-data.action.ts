/* eslint-disable @typescript-eslint/no-explicit-any */
export class AuthChangeExtraDataAction {
  static readonly type = '[AUTH] Change Extra Data';
  constructor(public extraData: any | null) {}
}
