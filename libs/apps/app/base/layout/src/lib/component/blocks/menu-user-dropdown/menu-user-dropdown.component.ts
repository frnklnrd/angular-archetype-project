import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractComponent } from '@app/core/api';
import { AuthUserDataModel } from '@app/core/auth/api';
import { AuthDataState } from '@app/core/auth/store/state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-user-dropdown',
  templateUrl: './menu-user-dropdown.component.html',
  styleUrls: ['./menu-user-dropdown.component.scss'],
})
export class MenuUserDropdownComponent
  extends AbstractComponent
  implements OnInit
{
  // -----------------------------------------------------
  // OBSERVABLES
  // -----------------------------------------------------

  @Select(AuthDataState.isLogged)
  public isUserLogged$!: Observable<boolean>;

  @Select(AuthDataState.getUserData)
  public userData$!: Observable<AuthUserDataModel>;

  // -----------------------------------------------------
  // SERVICES
  // -----------------------------------------------------

  // private flow!: FlowManagerService;

  private router: Router = inject<Router>(Router);

  // -----------------------------------------------------

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onClickLogin(): void {
    this.router.navigate(['/login']);
    // this.flow.startAction('', '', 'login', null, {}, true).then();
  }

  onClickLogout(): void {
    this.router.navigate(['/logout']);
    // this.flow.startAction('', '', 'logout', null, {}, true).then();
  }

  onClickRegister(): void {
    this.router.navigate(['/register']);
    // this.flow.startAction('', '', 'register', null, {}, true).then();
  }
}
