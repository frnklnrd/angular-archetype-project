import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '@app/core/api';

@Component({
  selector: 'app-menu-sidebar-main',
  templateUrl: './menu-sidebar-main.component.html',
  styleUrls: ['./menu-sidebar-main.component.scss'],
})
export class MenuSidebarMainComponent
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
