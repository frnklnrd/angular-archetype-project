import { Component, inject } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import { APP_VERSION } from '../../../config/app.vars';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {
  version: string = inject(APP_VERSION);

  constructor() {
    super();
  }
}
