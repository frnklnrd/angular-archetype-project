/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AUTH_MANAGER_SERVICE,
  AuthManagerService,
} from '@app/core/auth/manager/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpResponseAuthorizationErrorInterceptor
  implements HttpInterceptor
{
  private auth: AuthManagerService =
    inject<AuthManagerService>(AUTH_MANAGER_SERVICE);

  constructor() {
    //
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.auth.logout().then();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
