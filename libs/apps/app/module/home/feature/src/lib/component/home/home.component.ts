/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractFeatureComponent } from '@app/core/ddd/api';
import { FlowManagerService } from '@app/core/flow/manager';
import { Store } from '@ngxs/store';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent
  extends AbstractFeatureComponent
  implements OnInit, OnDestroy
{
  // ----------------------------------------------------------
  // SERVICES
  // ----------------------------------------------------------

  private store: Store = inject<Store>(Store);

  private flow: FlowManagerService =
    inject<FlowManagerService>(FlowManagerService);

  // ----------------------------------------------------------
  // PROPERTIES
  // ----------------------------------------------------------

  // -----------------------------------------------------
  // OBSERVABLES
  // -----------------------------------------------------

  // -----------------------------------------------------

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const isLogged = this.store.selectSnapshot((state) => state.auth.logged);

    // this.logger.console.log('is Logged!!!!', isLogged);

    if (isLogged) {
      this.flow.startAction('', 'dashboard', '', null, {}, true).then();
      return;
    }

    this.flow
      .startAction('', '', 'login', null, { redirect: '/dashboard' }, true)
      .then();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // ---------------------------------------------------------
}
