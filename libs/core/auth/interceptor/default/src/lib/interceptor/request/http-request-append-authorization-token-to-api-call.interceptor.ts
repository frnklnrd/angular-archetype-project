/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractService } from '@app/core/api';
import { Store } from '@ngxs/store';

@Injectable()
export class HttpRequestAppendAuthorizationTokenToApiCallInterceptor
  extends AbstractService
  implements HttpInterceptor
{
  private apiCallsPrefix: string[] = [];

  private store: Store = inject<Store>(Store);

  constructor() {
    super();
    this.apiCallsPrefix = this.store.selectSnapshot<string[]>(
      (state) => state.config?.api?.all_prefixes
    );
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.logger.console.debug(this.__classname, 'intercept', request);

    // add authorization header in api request with jwt token if available

    if (!this.apiCallsPrefix || this.apiCallsPrefix.length == 0) {
      return next.handle(request);
    }

    const find = this.apiCallsPrefix.find(
      (prefix: string) => request.url.indexOf(prefix) !== -1
    );

    const logged: boolean = this.store.selectSnapshot<boolean>(
      (state) => state.auth?.logged
    );

    if (!find || !logged) {
      return next.handle(request);
    }

    this.logger.console.debug(this.__classname, 'find && logged', find, logged);

    const accessToken: any = this.store.selectSnapshot<any>(
      (state) => state.auth?.token?.accessToken
    );

    if (!accessToken) {
      return next.handle(request);
    }

    // this.logger.console.debug(this.__classname, 'accessToken', accessToken);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (!request.headers.has('Access-Control-Allow-Origin')) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return next.handle(request);
  }
}
