import { Injectable } from '@angular/core';
import { AbstractAuthManagerService } from '@app/core/auth/manager/api';


@Injectable()
export class DefaultAuthManagerService extends AbstractAuthManagerService {
  constructor() {
    super();
  }

  public isLogged(): boolean {
    return this.store.selectSnapshot((state) => state.auth.logged);
  }

  public isAdmin(): boolean {
    return this.hasPermission('ROLE_ADMIN');
  }

  public getUserName(): string | null {
    return this.store.selectSnapshot((state) => state.auth.userData.userName);
  }

  public getUserRoles(): string[] {
    const userPermissions = this.store.selectSnapshot(
      (state) => state.auth.userPermissions
    );

    let userRoles = userPermissions?.userRoles
      ? userPermissions?.userRoles
      : [];

    userRoles = [...userRoles].filter(
      (role) => role !== 'IS_AUTHENTICATED' && role !== 'IS_ANONYMOUS'
    );

    const isLogged = this.store.selectSnapshot((state) => state.auth.logged);

    if (isLogged && userRoles.indexOf('IS_AUTHENTICATED') === -1) {
      userRoles.push('IS_AUTHENTICATED');
    }

    if (!isLogged && userRoles.indexOf('IS_ANONYMOUS') === -1) {
      userRoles.push('IS_ANONYMOUS');
    }

    return userRoles;
  }

  public hasPermission(role: string): boolean {
    return this.hasPermissions([role], 'and');
  }

  public hasPermissions(roles: string[], operator: string = 'and'): boolean {
    if (roles.length === 0) {
      return true;
    }
    const userRoles = this.getUserRoles();

    if (!userRoles || userRoles.length === 0) {
      return false;
    }

    const allRoles = operator === 'and';

    let hasAllRoles = allRoles;

    roles.forEach((role) => {
      if (allRoles) {
        hasAllRoles =
          hasAllRoles && userRoles.indexOf(role.toLocaleUpperCase()) !== -1;
      } else {
        hasAllRoles =
          hasAllRoles || userRoles.indexOf(role.toLocaleUpperCase()) !== -1;
      }
    });

    return hasAllRoles;
  }
}
