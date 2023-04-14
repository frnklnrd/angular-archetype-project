/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { INavData } from '@coreui/angular';
import { APP_LAYOUT_NAV_DATA } from '../../../variable/variables';
import { Store } from '@ngxs/store';
import { ChildrenOutletContexts } from '@angular/router';

// navItems = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  store: Store = inject<Store>(Store);

  private contexts: ChildrenOutletContexts = inject<ChildrenOutletContexts>(ChildrenOutletContexts);

  public navItems: INavData[] = inject<INavData[]>(APP_LAYOUT_NAV_DATA);

  public theme = 'light'; // dark

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
    //
  }

  onSideBarToggle($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  getRouteAnimationData(): string {
    const currentTextDirectionInverted = this.store.selectSnapshot<boolean>(
      (state: any) => state.translation.textDirectionInverted
    );

    const routeAnimation =
      this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];

    const animation = routeAnimation
      ? routeAnimation + (currentTextDirectionInverted ? '-inverted' : '')
      : 'default';

    return animation;
  }
}
