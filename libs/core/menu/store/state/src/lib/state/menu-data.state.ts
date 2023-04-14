/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { AbstractDataState } from '@app/core/ddd/api';
import { MenuModel } from '@app/core/menu/store/model';

import { MenuSetItemAction } from '@app/core/menu/store/action';
import { Action, State, StateContext } from '@ngxs/store';
import { MENU_STATE_TOKEN } from '../variable/variables';

@State<MenuModel>({
  name: MENU_STATE_TOKEN,
  defaults: MenuDataState.getStoredDefaultsValue(),
})
@Injectable()
export class MenuDataState extends AbstractDataState {
  static override getStoredDefaultsValue(): MenuModel {
    return {
      items: {},
    };
  }

  static override getStoredKeys(prefix: string = ''): string[] {
    return [].map(
      (key) =>
        (prefix && prefix !== '' ? prefix + '.' : '') + 'menu' + '.' + key
    );
  }

  // ----------------------------------------------------------

  static getMenuItemsSelector(id: string) {
    return (state: any) => state.menu.items[id];
  }

  // ----------------------------------------------------------

  @Action(MenuSetItemAction)
  stackFlowAction(
    ctx: StateContext<MenuModel>,
    action: MenuSetItemAction
  ): void {
    const state = ctx.getState();
    if (action.id) {
      ctx.patchState({
        items: { ...state.items, [action.id]: action.options },
      });
    }
  }

  // ----------------------------------------------------------
}
