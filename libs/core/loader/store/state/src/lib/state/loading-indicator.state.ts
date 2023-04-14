import { inject, Injectable } from '@angular/core';
import { AbstractDataState } from '@app/core/ddd/api';
import {
  LoadingIndicatorStopForAction,
  LoadingIndicatorWaitForAction,
} from '@app/core/loader/store/action';
import { LoadingIndicatorModel } from '@app/core/loader/store/model';
import { UtilUuidManagerService } from '@app/util/uuid/manager';

import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { filter, Observable, take } from 'rxjs';
import { CORE_LOADING_STATE_TOKEN } from '../variables/variables';

@State<LoadingIndicatorModel>({
  name: CORE_LOADING_STATE_TOKEN,
  defaults: LoadingIndicatorState.getStoredDefaultsValue(),
})
@Injectable()
export class LoadingIndicatorState extends AbstractDataState {
  private uuid: UtilUuidManagerService = inject<UtilUuidManagerService>(
    UtilUuidManagerService
  );

  private store: Store = inject<Store>(Store);

  private observables: Map<
    string,
    Observable<boolean | null> | Promise<boolean | null>
  > = new Map();

  // ----------------------------------------------------------

  static override getStoredDefaultsValue(): LoadingIndicatorModel {
    return {
      loading: false,
      actives: {},
    };
  }

  static override getStoredKeys(prefix: string = ''): string[] {
    return [].map(
      (key) =>
        (prefix && prefix !== '' ? prefix + '.' : '') + 'Loading' + '.' + key
    );
  }

  // ----------------------------------------------------------

  @Selector()
  static isLoading(state: LoadingIndicatorModel): boolean {
    return state.loading;
  }

  @Action(LoadingIndicatorWaitForAction)
  waitFor(
    ctx: StateContext<LoadingIndicatorModel>,
    action: LoadingIndicatorWaitForAction
  ): void {
    const state = ctx.getState();
    if (action.obs) {
      const pid = this.uuid.uuid();
      const actives = { ...state.actives, [pid]: action.description };
      this.observables.set(pid, action.obs);
      ctx.patchState({
        loading: Object.keys(actives).length > 0,
        actives: actives,
      });
      if (action.obs instanceof Observable) {
        action.obs
          .pipe(
            filter((result) => result === false),
            take(1)
          )
          .subscribe((result: boolean | null) => {
            if (result === false) {
              setTimeout(() => {
                this.store.dispatch(new LoadingIndicatorStopForAction(pid));
              }, 200);
            }
          });
      } else if (action.obs instanceof Promise) {
        action.obs.then((result: boolean | null) => {
          if (result === false) {
            setTimeout(() => {
              this.store.dispatch(new LoadingIndicatorStopForAction(pid));
            }, 200);
          }
        });
      }
    }
  }

  @Action(LoadingIndicatorStopForAction)
  stopFor(
    ctx: StateContext<LoadingIndicatorModel>,
    action: LoadingIndicatorStopForAction
  ): void {
    const state = ctx.getState();
    const actives = { ...state.actives };
    delete actives[action.pid];
    this.observables.delete(action.pid);
    ctx.patchState({
      loading: Object.keys(actives).length > 0,
      actives: actives,
    });
  }
}
