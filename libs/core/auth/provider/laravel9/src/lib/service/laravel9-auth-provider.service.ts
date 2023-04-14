/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from '@angular/core';
import { AuthProviderType } from '@app/core/auth/api';
import { AbstractAuthProviderService } from '@app/core/auth/provider/api';
import { AuthService } from '@app/vendor/api-client/laravel9';

import { Store } from '@ngxs/store';
import { map, Subject, switchMap, take, throwError } from 'rxjs';

interface Laravel9AuthConfigModel {
  apiBasePath: string;
  apiTokenRefreshTime: number;
}

@Injectable()
export class Laravel9AuthProviderService extends AbstractAuthProviderService<Laravel9AuthConfigModel> {
  protected store: Store = inject<Store>(Store);

  protected authService: AuthService = inject<AuthService>(AuthService);

  constructor() {
    super();
  }

  public getProviderKey(): string {
    return AuthProviderType.LARAVEL9;
  }

  protected doConfigure(callback?: (data?: any) => void): Promise<boolean> {
    this.logger.console.debug(this.__classname, 'doConfigure');

    this.setAuthConfig({
      apiBasePath: this.store.selectSnapshot<string>(
        (state) => state.config.auth.providers.laravel9.config.base_path
      ),
      apiTokenRefreshTime: Number.parseInt(
        this.store.selectSnapshot<string>(
          (state) =>
            state.config.auth.providers.laravel9.config.token_refresh_time
        )
      ),
    });

    return Promise.resolve(true);
  }

  protected doLogin(data?: any): Promise<boolean | undefined> {
    this.logger.console.debug(this.__classname, 'doLogin');

    const bodyParams: any = {
      email: data.email,
      password: data.password,
      remember_me: data.remember_me,
    };

    const result$: Subject<boolean | any> = new Subject();

    this.authService
      .login(bodyParams as any)
      .pipe(
        take(1),
        // Obtain Token Response and Verify if is OK or NOT
        map((tokenResponse: any) => {
          this.logger.console.debug(
            this.__classname,
            'authentication -> response',
            tokenResponse
          );

          if (tokenResponse?.data?.tokens?.access_token) {
            return tokenResponse;
          }

          this.logger.console.debug(
            this.__classname,
            'authentication -> error'
          );

          const error = JSON.stringify(
            tokenResponse?.error ? tokenResponse?.error : tokenResponse
          );

          this.logger.console.error(this.__classname, error);

          return throwError(error);
        }),
        // Processing Token Response Successfully and Request User Data
        switchMap((tokenResponse: any) => {
          this.logger.console.debug(this.__classname, 'authentication -> ok');

          this.authService.configuration.accessToken =
            tokenResponse?.data?.tokens?.access_token;

          const profileBodyParams: any = {
            user: tokenResponse.data.user.email,
          };

          return this.authService.user(profileBodyParams).pipe(
            take(1),
            // Processing User Response Successfully
            map((userResponse: any) => {
              this.logger.console.debug(
                this.__classname,
                'userData -> obtained',
                userResponse
              );

              return {
                tokenResponse,
                userResponse: userResponse ? userResponse : {},
              };
            })
          );
        }),
        // Processing Token Response and User Data Successfully
        map(({ tokenResponse, userResponse }: any) => {
          const userPayload = {
            token: tokenResponse.data.tokens,
            user: userResponse.data,
          };
          this.logger.console.debug(
            this.__classname,
            'emitLoginCallback -> userPayload',
            userPayload
          );

          // obtain groups???

          return userPayload;
        })
      )
      .subscribe(
        (response) => {
          this.logger.console.debug(this.__classname, 'signIn -> ok', response);
          this.emitLoginCallback(response);
          result$.next(true);
          result$.complete();
        },
        (error) => {
          this.logger.console.debug(this.__classname, 'signIn -> error', error);
          result$.next(false);
          result$.complete();
        }
      );

    return result$.asObservable().toPromise();
  }

  protected doLogout(data?: any): Promise<boolean> {
    this.logger.console.debug(this.__classname, 'logout');
    this.emitLogoutCallback(null);
    return Promise.resolve(true);
  }

  protected doRefreshToken(data?: any): Promise<boolean> {
    this.logger.console.debug(this.__classname, 'doRefreshToken', data);

    const bodyParams: any = {
      refresh_token: data?.token.refreshToken,
    };

    const result$: Subject<boolean | any> = new Subject();

    this.authService
      .refreshToken(bodyParams)
      .pipe(
        take(1),
        map((refreshTokenResponse: any) => {
          this.logger.console.debug(
            this.__classname,
            'refreshToken -> response',
            refreshTokenResponse
          );

          if (refreshTokenResponse?.access_token) {
            return refreshTokenResponse;
          }

          this.logger.console.debug(this.__classname, 'refreshToken -> error');

          const error = JSON.stringify(
            refreshTokenResponse?.error
              ? refreshTokenResponse?.error
              : refreshTokenResponse
          );

          this.logger.console.error(this.__classname, error);

          return throwError(error);
        }),
        map((refreshTokenResponse: any) => {
          this.logger.console.debug(
            this.__classname,
            'refreshToken -> ok',
            refreshTokenResponse
          );

          this.authService.configuration.accessToken =
            refreshTokenResponse.access_token;

          const refreshTokenData = this.getTokenDataFromPayload({
            token: refreshTokenResponse,
          });

          return refreshTokenData;
        })
      )
      .subscribe(
        (response) => {
          this.logger.console.debug(
            this.__classname,
            'refreshToken -> ok',
            response
          );
          this.emitRefreshTokenCallback(response);
          result$.next(true);
          result$.complete();
        },
        (error) => {
          this.logger.console.debug(
            this.__classname,
            'refreshToken -> error',
            error
          );
          result$.next(false);
          result$.complete();
        }
      );

    return result$.asObservable().toPromise();

    return Promise.resolve(true);
  }

  protected isLogged(payload?: any): boolean {
    return !!payload?.token?.access_token;
  }

  protected getTokenType(payload: any): string | null {
    return payload?.token?.token_type;
  }

  protected getTokenExpiresIn(payload: any): number | null {
    return payload?.token?.expires_in;
  }

  protected getTokenExpiresAt(payload: any): Date | null {
    const expiresAt = new Date();
    expiresAt.setSeconds(
      expiresAt.getSeconds() + Number.parseInt(payload?.token?.expires_in)
    );
    return expiresAt;
  }

  protected getUserName(payload: any): string | null {
    return payload?.user?.email;
  }

  protected getUserRoles(payload: any): string[] {
    return Number.parseInt(payload?.user?.role_id) === 1
      ? ['ROLE_USER', 'ROLE_LARAVEL_USER', 'ROLE_ADMIN', 'ROLE_LARAVEL_ADMIN']
      : ['ROLE_USER', 'ROLE_LARAVEL_USER'];
  }

  protected getProviderAuthId(payload: any): string | null {
    return payload?.user?.email;
  }

  protected getToken(payload: any): string | null {
    return payload?.token?.access_token;
  }

  protected getTokenId(payload: any): string | null {
    const decodedTokenData = this.getTokenDecodedData(payload);
    return decodedTokenData?.aud;
  }

  protected getTokenAccessToken(payload: any): string | null {
    return payload?.token?.access_token;
  }

  protected getTokenRefreshToken(payload: any): string | null {
    return payload?.token?.refresh_token;
  }

  protected getEmail(payload: any): string | null {
    return payload?.user?.email;
  }

  protected getFullName(payload: any): string | null {
    return payload?.user?.name;
  }

  protected getFirstName(payload: any): string | null {
    return payload?.user?.name;
  }

  protected getLastName(payload: any): string | null {
    return '';
  }

  protected getPhotoUrl(payload: any): string | null {
    return (
      this.authConfig.apiBasePath + '/storage/' +
      payload?.user?.avatar
    );
  }

  protected getLocale(payload: any): string | null {
    return 'en';
  }

  protected doGetExtraData(payload?: any) {
    return payload?.user;
  }
}
