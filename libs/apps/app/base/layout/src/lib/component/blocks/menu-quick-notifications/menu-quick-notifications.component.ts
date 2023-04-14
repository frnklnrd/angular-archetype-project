import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '@app/core/api';

@Component({
  selector: 'app-menu-quick-notifications',
  templateUrl: './menu-quick-notifications.component.html',
  styleUrls: ['./menu-quick-notifications.component.scss'],
})
export class MenuQuickNotificationsComponent
  extends AbstractComponent
  implements OnInit
{

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
