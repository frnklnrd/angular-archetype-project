/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { AbstractService } from '@app/core/api';
import { MenuSetItemAction } from '@app/core/menu/store/action';
import { Store } from '@ngxs/store';

export class MenuManagerService extends AbstractService {
  private store: Store = inject<Store>(Store);

  constructor() {
    super();
  }

  public addMenuOptions(id: string, options: any): void {
    this.store.dispatch(new MenuSetItemAction(id, options));
  }
}
