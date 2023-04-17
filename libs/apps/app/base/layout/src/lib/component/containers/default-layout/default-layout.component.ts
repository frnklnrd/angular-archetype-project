/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { AbstractComponent } from '@app/core/api';
import { MenuDataState } from '@app/core/menu/store/state';
import { INavData } from '@coreui/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { slideInAnimations } from '../../animations';

// navItems = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  animations: [
    // noneAnimations,
    // faderAnimations,
    slideInAnimations,
    // slideLeftRightAnimations,
    // translateRotateAnimations
  ],
})
export class DefaultLayoutComponent
  extends AbstractComponent
  implements OnInit
{
  // ---------------------------------------------------------------------

  private store: Store = inject<Store>(Store);

  private contexts: ChildrenOutletContexts = inject<ChildrenOutletContexts>(
    ChildrenOutletContexts
  );

  // ---------------------------------------------------------------------

  @Select(MenuDataState.getMenuItemsSelector('layout-sidebar-main-items'))
  protected navItems$!: Observable<INavData[]>;

  @Select(MenuDataState.getMenuItemsSelector('layout-sidebar-footer-items'))
  protected footerNavItems$!: Observable<INavData[]>;

  // ---------------------------------------------------------------------

  navItems: INavData[] = [];

  footerNavItems: INavData[] = [];

  theme = 'light'; // dark

  perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  // ---------------------------------------------------------------------

  constructor() {
    super();
    //
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.navItems = [];
    this.footerNavItems = [];

    this.addSubscription(
      this.navItems$.subscribe((data) => {
        this.navItems = data;
      })
    );

    this.addSubscription(
      this.footerNavItems$.subscribe((data) => {
        this.footerNavItems = data;
      })
    );
  }

  onSideBarToggle($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  getRouteAnimationData(): string {
    // this.logger.console.debug(this.__classname, 'getRouteAnimationData');

    const currentTextDirectionInverted = this.store.selectSnapshot<boolean>(
      (state: any) => state.translation.textDirectionInverted
    );

    const routeAnimation =
      this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];

    const animation = routeAnimation
      ? routeAnimation
      : currentTextDirectionInverted
      ? 'isRight'
      : 'isLeft';

    // this.logger.console.debug(this.__classname, 'routeAnimation', animation);

    return animation;
  }
}
