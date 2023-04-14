import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '@app/core/api';

@Component({
  template: '',
})
export abstract class AbstractUiComponent
  extends AbstractComponent
  implements OnInit
{
  protected constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
