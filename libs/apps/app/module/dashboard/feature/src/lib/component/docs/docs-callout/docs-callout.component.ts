/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-docs-callout',
  templateUrl: './docs-callout.component.html',
  styleUrls: ['./docs-callout.component.scss'],
})
export class DocsCalloutComponent {
  @Input() name: string = '';

  constructor() {}

  private _href: string = 'https://coreui.io/angular/docs/';

  get href(): string {
    return this._href;
  }

  @Input()
  set href(value: string) {
    const version = '1.0.0';
    const docsUrl = 'https://coreui.io/angular/';
    // const path: string = version ? `${version}/${value}` : `${value}`;
    const path: string = value;
    this._href = `${docsUrl}${path}`;
  }

  get plural() {
    return this.name?.slice(-1) === 's';
  }
}
