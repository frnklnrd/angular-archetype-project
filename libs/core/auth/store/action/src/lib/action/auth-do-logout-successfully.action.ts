export class AuthDoLogoutSuccessfullyAction {
  static readonly type = '[AUTH] Logout Successfully';

  constructor(public loggedOut: boolean) {}
}
