import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AUTH_MANAGER_SERVICE,
  AuthManagerService,
} from '@app/core/auth/manager/api';
import { AbstractFeatureComponent } from '@app/core/ddd/api';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent
  extends AbstractFeatureComponent
  implements OnInit, OnDestroy
{
  private auth: AuthManagerService =
    inject<AuthManagerService>(AUTH_MANAGER_SERVICE);

  override ngOnInit(): void {
    super.ngOnInit();
    this.startLoader();
    this.auth
      .logout({})
      .then((result) => {
        this.logger.console.log(this.__classname, 'auth -> logout ok', result);
        setTimeout(() => {
          this.endLoader();
          this.auth.dispatchLogoutSuccessfully();
        }, 500);
      })
      .catch((e) => {
        this.logger.console.log(this.__classname, 'auth -> logout error', e);
        this.logger.console.error(e);
      });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
