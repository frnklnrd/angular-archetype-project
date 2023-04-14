import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '@app/core/api';

@Component({
  selector: 'app-menu-quick-links',
  templateUrl: './menu-quick-links.component.html',
  styleUrls: ['./menu-quick-links.component.scss'],
})
export class MenuQuickLinksComponent
  extends AbstractComponent
  implements OnInit
{
  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
