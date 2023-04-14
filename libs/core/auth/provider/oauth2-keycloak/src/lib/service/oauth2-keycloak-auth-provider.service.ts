/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from '@angular/core';
import { AuthProviderType } from '@app/core/auth/api';
import { AbstractAuthProviderService } from '@app/core/auth/provider/api';
import { Store } from '@ngxs/store';
import {
  AuthConfig,
  NullValidationHandler,
  OAuthService,
} from 'angular-oauth2-oidc';

@Injectable()
export class Oauth2KeycloakAuthProviderService extends AbstractAuthProviderService<AuthConfig> {
  protected oauthService: OAuthService = inject<OAuthService>(OAuthService);

  protected store: Store = inject<Store>(Store);

  constructor() {
    super();
  }

  public getProviderKey(): AuthProviderType {
    return AuthProviderType.OAUTH2_KEYCLOAK;
  }

  protected doConfigure(data?: any): Promise<boolean> {
    this.logger.console.debug(this.__classname, 'doConfigure');

    this.setAuthConfig(
      this.store.selectSnapshot<AuthConfig>(
        (state) => state.config.auth.providers.keycloak.config
      )
    );

    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    // this.oauthService.loadDiscoveryDocumentAndTryLogin()
    return this.oauthService
      .loadDiscoveryDocument()
      .then(
        ($event) => {
          return this.oauthService.tryLogin().then(
            (result: boolean) => {
              return true;
            },
            (error: any) => {
              this.logger.console.error(this.__classname, error);
              return false;
            }
          );
        },
        (error: any) => {
          this.logger.console.error(this.__classname, error);
          return false;
        }
      )
      .then(
        (result: boolean) => {
          if (this.oauthService.getIdentityClaims()) {
            const payload = this.getPayloadDecodedData();
            payload._previousState = this.oauthService.state
              ? JSON.parse(decodeURIComponent('' + this.oauthService.state))
              : null;
            this.emitLoginCallback(payload);
            return payload;
          } else {
            this.emitLogoutCallback(null);
            return null;
          }
        },
        (error: any) => {
          this.logger.console.error(this.__classname, error);
          return false;
        }
      );
  }

  private getPayloadDecodedData(data?: any): any {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload); // from base64
    const payloadDecodedJson = JSON.parse(payloadDecoded);
    return payloadDecodedJson;
  }

  protected getExpireAt(payload?: any): Date | null {
    return payload?.exp;
  }

  protected isLogged(payload?: any): boolean {
    return (
      this.oauthService.hasValidIdToken() &&
      this.oauthService.hasValidAccessToken()
    );
  }

  protected getUserName(payload?: any): string | null {
    return payload?.preferred_username;
  }

  protected getUserRoles(payload?: any): string[] {
    if (!payload) {
      return [];
    }
    return payload.realm_access.roles.map(
      (role: string) => 'ROLE_' + role.replace('realm-', '').toLocaleUpperCase()
    );
  }

  protected doLogin(data?: any): Promise<boolean | undefined> {
    // this.oauthService.initImplicitFlowInternal(
    this.oauthService.initLoginFlow(
      JSON.stringify(data?.additionalState),
      data?.params
    );
    return Promise.resolve(true);
  }

  protected doLogout(data?: any): Promise<boolean> {
    // this.oauthService.logOut();
    this.oauthService.revokeTokenAndLogout();
    // when is not oauth2
    // this.oauthService.revokeTokenAndLogout()
    return Promise.resolve(true);
  }

  protected doRefreshToken(data?: any): Promise<boolean> {
    return this.oauthService.refreshToken().then((result) => {
      const tokenInfo: any = this.getTokenDecodedData({
        token: result,
      });
      this.emitRefreshTokenCallback(tokenInfo);
      return true;
    });
  }

  protected getEmail(payload?: any): string | null {
    return payload?.email;
  }

  protected getFirstName(payload?: any): string | null {
    return payload?.given_name;
  }

  protected getFullName(payload?: any): string | null {
    return payload?.name;
  }

  protected getLastName(payload?: any): string | null {
    return payload?.family_name;
  }

  protected getPhotoUrl(payload?: any): string | null {
    return null;
  }

  protected getProviderAuthId(payload?: any): string | null {
    return payload?.sub;
  }

  protected getToken(payload?: any): string | null {
    return this.oauthService.getAccessToken();
  }

  protected getIdToken(payload?: any): string | null {
    return payload?.sid;
  }

  protected getAccessToken(payload?: any): string | null {
    return payload?.sid;
  }

  protected getLocale(payload?: any): string | null {
    return payload?.locale;
  }

  protected getTokenExpiresIn(payload: any): number | null {
    throw new Error('Method not implemented.');
  }
  protected getTokenExpiresAt(payload: any): Date | null {
    throw new Error('Method not implemented.');
  }
  protected getTokenType(payload: any): string | null {
    throw new Error('Method not implemented.');
  }
  protected getTokenId(payload: any): string | null {
    throw new Error('Method not implemented.');
  }
  protected getTokenAccessToken(payload: any): string | null {
    throw new Error('Method not implemented.');
  }
  protected getTokenRefreshToken(payload: any): string | null {
    throw new Error('Method not implemented.');
  }

  protected doGetExtraData(payload?: any) {
    throw new Error('Method not implemented.');
  }
}
