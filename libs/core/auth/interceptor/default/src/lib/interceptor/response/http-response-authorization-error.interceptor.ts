/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractService } from '@app/core/api';
import {
  AUTH_MANAGER_SERVICE,
  AuthManagerService,
} from '@app/core/auth/manager/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpResponseAuthorizationErrorInterceptor
  extends AbstractService
  implements HttpInterceptor
{
  private auth: AuthManagerService =
    inject<AuthManagerService>(AUTH_MANAGER_SERVICE);

  constructor() {
    super();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.logger.console.error(
          err.status,
          '[' + err.statusText + '] - ' + err.error.message
        );
        if (err.status === 401 || err.status === 403) {
          // logout if 401 or 403 response returned from api
          this.auth
            .logout({})
            .then(() => {
              this.auth.dispatchLogoutSuccessfully();
            })
            .catch((e) => {
              //
            });
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
