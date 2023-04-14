/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'thumbnail'
})
export class BookThumbnailPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){

  }

  transform(value: any, ...args: any[]): any {
    return this.sanitizer.bypassSecurityTrustHtml('<img src="' + value + '" class="lozad" loading="lazy" height="45px">');
  }

}
