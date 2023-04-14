/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthManagerService,
  AUTH_MANAGER_SERVICE,
} from '@app/core/auth/manager/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpResponseAuthorizationErrorInterceptor
  implements HttpInterceptor
{
  private router: Router = inject<Router>(Router);

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
          this.auth.logout().then(() => {
            this.router.navigate(['/500']).then();
            // location.reload(true);
          });
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
