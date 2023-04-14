/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'authors',
})
export class BookAuthorsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string[], ...args: any[]): any {
    let display = '';
    display += '<ol style="padding-left: 10px;">';
    value?.forEach((author) => {
      display += '<li>' + author + '</li>';
    });
    display += '</ol>';
    return this.sanitizer.bypassSecurityTrustHtml(display);
  }
}
