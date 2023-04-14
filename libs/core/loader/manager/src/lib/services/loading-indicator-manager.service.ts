import { inject, Injectable } from '@angular/core';
import { AbstractService } from '@app/core/api';
import { LoadingIndicatorWaitForAction } from '@app/core/loader/store/action';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingIndicatorManagerService extends AbstractService {
  protected store: Store = inject<Store>(Store);

  constructor() {
    super();
  }

  public waitFor(
    observable: Observable<boolean | null> | null | Promise<boolean | null>,
    description: string
  ): void {
    if (observable) {
      this.store.dispatch(new LoadingIndicatorWaitForAction(observable, description));
    }
  }
}
