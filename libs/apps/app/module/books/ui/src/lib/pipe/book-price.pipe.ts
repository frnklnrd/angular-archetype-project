/* eslint-disable @typescript-eslint/no-unused-vars */
import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Pipe({
  name: 'bookPrice'
})
export class BookPricePipe implements PipeTransform {

  constructor(private currency: CurrencyPipe) {
  }

  transform(value: string, ...args: unknown[]): string | null{
    return this.currency.transform(value, 'USD', 'symbol-narrow', '1.2-2');
  }

}
