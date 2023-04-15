/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { AbstractComponent } from '@app/core/api';
import { INavData } from '@coreui/angular';
import { Store } from '@ngxs/store';
import { APP_LAYOUT_NAV_DATA } from '../../../variable/variables';
import {
  faderAnimations,
  slideInAnimations,
  slideLeftRightAnimations,
  translateRotateAnimations,
} from '../../animations';

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
export class DefaultLayoutComponent extends AbstractComponent {
  store: Store = inject<Store>(Store);

  private contexts: ChildrenOutletContexts = inject<ChildrenOutletContexts>(
    ChildrenOutletContexts
  );

  public navItems: INavData[] = inject<INavData[]>(APP_LAYOUT_NAV_DATA);

  public theme = 'light'; // dark

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
    super();
    //
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
