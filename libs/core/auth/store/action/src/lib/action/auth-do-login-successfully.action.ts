export class AuthDoLoginSuccessfullyAction {
  static readonly type = '[AUTH] Login Successfully';

  constructor(public loggedIn: boolean) {}
}
