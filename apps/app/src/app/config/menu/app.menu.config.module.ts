/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  AuthManagerService,
  AUTH_MANAGER_SERVICE,
} from '@app/core/auth/manager/api';
import { INavDataWithExtraOptions } from '@app/core/menu/api';
import {
  CoreMenuManagerModule,
  MenuManagerService,
} from '@app/core/menu/manager';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

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
export class AppMenuConfigModule {
  // --------------------------------------------------------------
  // SERVICES
  // --------------------------------------------------------------

  private store!: Store;

  private menu: MenuManagerService =
    inject<MenuManagerService>(MenuManagerService);

  private auth: AuthManagerService =
    inject<AuthManagerService>(AUTH_MANAGER_SERVICE);

  // --------------------------------------------------------------
  // PROPERTIES
  // --------------------------------------------------------------

  @Select((state: any) => state.config.menu.sidebar.main)
  private sidebarNavItems$!: Observable<INavDataWithExtraOptions[]>;
  private sidebarNavItemsData: INavDataWithExtraOptions[] = [];

  @Select((state: any) => state.config.menu.lang.available)
  private availableLanguages$!: Observable<any[]>;
  private availableLanguagesData: any[] = [];

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppMenuConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppMenuConfigModule is already loaded. Import it in the main config module only.'
      );
    }

    this.init();
  }

  private init(): void {
    // --------------------------------------------------------------
    // Sidebar Nav Items
    // --------------------------------------------------------------

    this.sidebarNavItems$.subscribe((data) => {
      this.sidebarNavItemsData = data;
      this.menu.addMenuOptions('sidebar-nav-items', data);
    });

    // --------------------------------------------------------------
    // Languages Chooser Options
    // --------------------------------------------------------------

    this.availableLanguages$.subscribe((data) => {
      this.availableLanguagesData = data;
      this.menu.addMenuOptions('languages-chooser-options', data);
    });

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
        const filteredSidebarNavItems = this.getFilteredMenuItemsByLogged(
          this.sidebarNavItemsData as INavDataWithExtraOptions[],
          logged
        );
        this.menu.addMenuOptions('sidebar-nav-items', filteredSidebarNavItems);
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
