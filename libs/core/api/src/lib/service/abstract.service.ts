import { inject } from '@angular/core';
import { LoggerService } from '@app/util/logger/manager';

export abstract class AbstractService {
  // ----------------------------------------------------------
  // PROPERTIES
  // ----------------------------------------------------------
  protected readonly __classname: string;

  // ----------------------------------------------------------
  // SERVICES
  // ----------------------------------------------------------

  protected readonly logger: LoggerService =
    inject<LoggerService>(LoggerService);

  // ----------------------------------------------------------
  constructor() {
    this.__classname = this.constructor.name;
  }
}
