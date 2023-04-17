/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  AUTH_MANAGER_SERVICE,
  AuthManagerService,
} from '@app/core/auth/manager/api';
import { INavDataWithExtraOptions } from '@app/core/menu/api';

import {
  CoreMenuManagerModule,
  MenuManagerService,
} from '@app/core/menu/manager';
import { LoggerService } from '@app/util/logger/manager';
import { Store } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ----------------
    CoreMenuManagerModule,
    // ----------------
  ],
  providers: [],
  exports: [],
})
export class AppNavConfigModule {
  // --------------------------------------------------------------
  // SERVICES
  // --------------------------------------------------------------

  private logger: LoggerService = inject<LoggerService>(LoggerService);

  private store: Store = inject<Store>(Store);

  private menu: MenuManagerService =
    inject<MenuManagerService>(MenuManagerService);

  private auth: AuthManagerService =
    inject<AuthManagerService>(AUTH_MANAGER_SERVICE);

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppNavConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppNavConfigModule is already loaded. Import it in the main config module only.'
      );
    }
    this.init();
  }

  private init(): void {
    this.logger.console.debug('AppNavConfigModule', 'init');
    // --------------------------------------------------------------
    // Sidebar Nav Items
    // --------------------------------------------------------------

    const mainNavItems = this.store.selectSnapshot(
      (state) => state.config.menu.sidebar.main
    );
    this.menu.addMenuOptions('layout-sidebar-main-items', mainNavItems);

    const footerNavItems = this.store.selectSnapshot(
      (state) => state.config.menu.sidebar.footer
    );
    this.menu.addMenuOptions('layout-sidebar-footer-items', footerNavItems);

    // --------------------------------------------------------------
    // Languages Chooser Options
    // --------------------------------------------------------------

    const languages = this.store.selectSnapshot(
      (state) => state.config.menu.lang.available
    );
    this.menu.addMenuOptions('language-available-options', languages);

    // --------------------------------------------------------------

    // --------------------------------------------------------------
    // Filter Menu Items By Some Logic
    // --------------------------------------------------------------

    // this.filterNavItemsByAuthenticationLogic();

    // --------------------------------------------------------------
  }

  private filterNavItemsByAuthenticationLogic() {
    this.store
      .select((state) => state.auth.logged)
      .subscribe((logged: boolean) => {
        // const filteredSidebarNavItems: any[] = [];
        // this.menu.addMenuOptions('sidebar-nav-items', filteredSidebarNavItems);
      });
  }

  private getFilteredMenuItemsByLogged(
    navItems: INavDataWithExtraOptions[],
    logged: boolean
  ): INavDataWithExtraOptions[] {
    return navItems
      .filter((item) => item !== null)
      .filter((item) =>
        this.auth.hasPermissions(
          item.extraOptions?.auth?.requiredRoles
            ? item.extraOptions?.auth?.requiredRoles
            : [],
          item.extraOptions?.auth?.requiredRolesOperator
            ? item.extraOptions?.auth?.requiredRolesOperator
            : 'and'
        )
      );
  }
}
