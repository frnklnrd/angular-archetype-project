import { Component, inject } from '@angular/core';
import { APP_ENV } from '@app/apps/app/base/api';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {

  version: string = inject(APP_ENV).version;

  constructor() {
    super();
  }
}
