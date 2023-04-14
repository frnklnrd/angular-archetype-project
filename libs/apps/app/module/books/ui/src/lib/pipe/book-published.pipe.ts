/* eslint-disable @typescript-eslint/no-unused-vars */
import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'bookPublished'
})
export class BookPublishedPipe implements PipeTransform {

  constructor(private date: DatePipe) {
  }

  transform(value: string, ...args: unknown[]): string | null {
    return this.date.transform(value, 'dd/MM/yyyy');
  }

}
