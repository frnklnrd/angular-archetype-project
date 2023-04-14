/* eslint-disable @typescript-eslint/no-explicit-any */

export class MenuSetItemAction {
  static readonly type = '[MENU] Set Item';

  constructor(public id: string, public options: any) {}
}
