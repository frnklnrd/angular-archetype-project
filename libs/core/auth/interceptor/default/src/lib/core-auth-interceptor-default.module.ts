import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpResponseAuthorizationErrorInterceptor } from './interceptor/http-response-authorization-error.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseAuthorizationErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreAuthInterceptorDefaultModule {}
