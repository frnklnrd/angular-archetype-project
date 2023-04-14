/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { AbstractService } from '@app/core/api';
import {
  AuthFullDataModel,
  AuthPayloadModel,
  AuthProviderModel,
  AuthTokenModel,
  AuthUserDataModel,
  AuthUserPermissionsModel,
} from '@app/core/auth/api';
import {
  AuthProviderService,
  AUTH_PROVIDER_SERVICE,
} from '@app/core/auth/provider/api';
import {
  AuthChangeExtraDataAction,
  AuthChangeIsDataLoadedFromStorageAction,
  AuthChangePayloadAction,
  AuthChangeProviderAction,
  AuthChangeTokenAction,
  AuthChangeUserDataAction,
  AuthChangeUserPermissionsAction,
  AuthDoLoginSuccessfullyAction,
  AuthDoLogoutSuccessfullyAction,
} from '@app/core/auth/store/action';

import { AuthDataState } from '@app/core/auth/store/state';

import { Store } from '@ngxs/store';

import { AuthManagerService } from './auth-manager.service';

export abstract class AbstractAuthManagerService
  extends AbstractService
  implements AuthManagerService
{
  protected store: Store = inject<Store>(Store);

  protected defaultProvider: AuthProviderService | null = null;

  protected providers: AuthProviderService[] = inject<AuthProviderService[]>(
    AUTH_PROVIDER_SERVICE
  );

  constructor() {
    super();
  }

  // -------------------------------------------------

  public init(data?: any): Promise<boolean> {
    this.logger.console.debug(this.__classname, 'init', data);

    this.providers.forEach((provider: AuthProviderService) => {
      provider.setAuthManagerService(this);
    });

    const defaultProviderKey =
      this.store.selectSnapshot<AuthProviderModel | null>(
        AuthDataState.getProvider
      );

    this.logger.console.debug(
      this.__classname,
      'defaultProviderKey',
      defaultProviderKey
    );

    const defaultPayload = this.store.selectSnapshot<AuthPayloadModel | null>(
      AuthDataState.getPayload
    );

    this.logger.console.debug(
      this.__classname,
      'defaultPayload',
      defaultPayload
    );

    const defaultProviderEnabled = this.checkIfDefaultProviderIsEnabled(
      defaultProviderKey ? defaultProviderKey.providerId : null
    );

    if (defaultProviderKey && defaultProviderEnabled) {
      const defaultAuthData = defaultPayload;

      return this.configureAsDefault(
        defaultProviderKey ? defaultProviderKey.providerId : null,
        defaultAuthData ? defaultAuthData : null
      ).then(
        (result: boolean) => {
          this.logger.console.debug(this.__classname, 'init -> finished');
          return result;
        },
        (error: any) => {
          this.logger.console.error(this.__classname, error);
          return false;
        }
      );
    }
    this.logger.console.debug(this.__classname, 'init -> finished');

    return Promise.resolve(true);
  }

  protected checkIfDefaultProviderIsEnabled(
    defaultProviderKey: string | null
  ): boolean {
    this.logger.console.debug(
      this.__classname,
      'checkIfDefaultProviderIsEnabled',
      defaultProviderKey
    );

    let defaultProviderEnabled = false;

    this.providers.forEach((provider: AuthProviderService) => {
      if (this.isProviderEnabled(provider.getProviderKey())) {
        this.logger.console.debug(
          this.__classname,
          'checkIfDefaultProviderIsEnabled -> provider.getProviderKey(), isDefault',
          provider.getProviderKey(),
          defaultProviderKey === provider.getProviderKey()
        );

        defaultProviderEnabled =
          defaultProviderEnabled ||
          defaultProviderKey === provider.getProviderKey();
      }
    });

    return defaultProviderEnabled;
  }

  /*
  protected initialSetupForAuthData(defaultAuthData: any | null): void {
    const provider = this.getCurrentProvider();
    if (provider && defaultAuthData) {
      try {
        this.dispatchAuthData(true, this.getPayload(), true);
      } catch (e) {
        this.logger.console.error(this.__classname, e);
      }
    } else {
      this.dispatchAuthData(false, null, true);
    }
  }*/

  // -------------------------------------------------

  public isProviderEnabled(providerKey: string): boolean {
    const provider = this.providers.find(
      (p) => p.getProviderKey().toUpperCase() === providerKey.toUpperCase()
    );
    return !!(provider && provider.isEnabled());
  }

  public getDefaultProvider(): AuthProviderService | null {
    return this.defaultProvider ? this.defaultProvider : null;
  }

  // -------------------------------------------------

  public configureAsDefault(
    defaultProviderKey: string | null,
    defaultAuthData: any | null = null
  ): Promise<boolean> {
    this.logger.console.debug(
      this.__classname,
      'configureAsDefault',
      defaultProviderKey,
      defaultAuthData
    );

    if (!defaultProviderKey || !this.isProviderEnabled(defaultProviderKey)) {
      return Promise.reject(
        'Provider [' + defaultProviderKey + '] Not Available!!!'
      );
    }

    this.logger.console.debug(
      this.__classname,
      'configureAsDefault -> setIsDefault',
      false
    );

    this.providers
      .filter(
        (p) =>
          p.getProviderKey().toUpperCase() !== defaultProviderKey?.toUpperCase()
      )
      .forEach((p) => {
        p.setIsDefault(false, null);
      });

    const provider = this.providers.find(
      (p) =>
        p.getProviderKey().toUpperCase() === defaultProviderKey?.toUpperCase()
    );

    if (!defaultProviderKey || !provider) {
      this.defaultProvider = null;
      this.store.dispatch(
        new AuthChangeProviderAction({
          providerId: null,
        })
      );
      return Promise.reject(
        'Provider [' + defaultProviderKey + '] Not Available!!!'
      );
    }

    this.logger.console.debug(
      this.__classname,
      'configureAsDefault -> setIsDefault',
      true,
      defaultAuthData
    );

    this.defaultProvider = provider;

    return this.defaultProvider.setIsDefault(true, defaultAuthData).then(
      () => {
        this.store.dispatch(
          new AuthChangeProviderAction({
            providerId: defaultProviderKey.toUpperCase(),
          })
        );
        return true;
      },
      (error: any) => {
        this.logger.console.error(this.__classname, 'logout -> error', error);
        return false;
      }
    );
  }

  // -------------------------------------------------

  public login(loginData?: any): Promise<any> {
    const provider = this.getDefaultProvider();
    if (provider) {
      return provider.login(loginData);
    }
    return Promise.reject('Current Provider Not Available!!!');
  }

  public logout(logoutData?: any): Promise<boolean> {
    const provider = this.getDefaultProvider();
    if (provider) {
      return provider.logout({
        payload: this.getPayload(logoutData),
        token: this.getTokenData(logoutData),
        data: logoutData,
      });
    }
    return Promise.reject('Provider Not Allowed To Logout!!!');
  }

  public refreshToken(refreshTokenData?: any): Promise<boolean> {
    const provider = this.getDefaultProvider();
    if (provider) {
      return provider.refreshToken({
        payload: this.getPayload(refreshTokenData),
        token: this.getTokenData(refreshTokenData),
        data: refreshTokenData,
      });
    }
    return Promise.reject('Provider Not Allowed To Logout!!!');
  }

  // -------------------------------------------------

  protected setPayload(payload?: any): void {
    this.dispatchPayload({
      data: payload,
    });
  }

  protected getPayload(data?: any): any {
    const payload = this.store.selectSnapshot<any>(AuthDataState.getPayload);
    return payload ? payload : data;
  }

  protected getTokenData(data?: any): any {
    const tokenData = this.store.selectSnapshot<any>(AuthDataState.getToken);
    return tokenData ? tokenData : data;
  }

  // -------------------------------------------------------

  private dispatchProvider(provider: AuthProviderModel | null): void {
    if (this.defaultProvider !== provider?.providerId) {
      this.store.dispatch(new AuthChangeProviderAction(provider));
    }
  }

  private dispatchPayload(payload: AuthPayloadModel | null): void {
    this.store.dispatch(new AuthChangePayloadAction(payload));
  }

  private dispatchToken(token: AuthTokenModel | null): void {
    this.store.dispatch(new AuthChangeTokenAction(token));
  }

  private dispatchUserData(userData: AuthUserDataModel | null): void {
    this.store.dispatch(new AuthChangeUserDataAction(userData));
  }

  private dispatchUserPermissions(
    userPermissions: AuthUserPermissionsModel | null
  ): void {
    this.store.dispatch(new AuthChangeUserPermissionsAction(userPermissions));
  }

  private dispatchExtraData(extraData: any | null): void {
    this.store.dispatch(new AuthChangeExtraDataAction(extraData));
  }

  private dispatchAuthenticationEndProcess(
    logged: boolean,
    loadedFromStore: boolean
  ): Promise<boolean> {
    if (!loadedFromStore) {
      if (logged) {
        return this.store
          .dispatch(new AuthDoLoginSuccessfullyAction(true))
          .toPromise();
      } else {
        return this.store
          .dispatch(new AuthDoLogoutSuccessfullyAction(true))
          .toPromise();
      }
    } else {
      return this.store
        .dispatch(new AuthChangeIsDataLoadedFromStorageAction(logged))
        .toPromise();
    }
    return Promise.resolve(true);
  }

  public dispatchLoginSuccessfully(): Promise<boolean> {
    return this.dispatchAuthenticationEndProcess(true, false);
  }

  public dispatchLogoutSuccessfully(): Promise<boolean> {
    return this.dispatchAuthenticationEndProcess(false, false);
  }

  public dispatchRefreshTokenSuccessfully(): Promise<boolean> {
    return this.dispatchAuthenticationEndProcess(true, false);
  }

  // -------------------------------------------------------

  private dispatchAuthData(
    logged: boolean,
    payload?: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadedFromStore: boolean = false
  ): void {
    const provider = this.getDefaultProvider();

    /*
    this.dispatchProvider({
      providerId: provider ? provider.getProviderKey() : null,
    });
    */

    this.dispatchPayload(logged ? payload : null);

    let authFullData: AuthFullDataModel | null = null;

    if (provider) {
      authFullData = provider.getAuthFullDataFromPayload(payload);
    }

    this.dispatchToken(
      logged
        ? {
            tokenType: authFullData?.token?.tokenType,
            idToken: authFullData?.token?.idToken,
            accessToken: authFullData?.token?.accessToken,
            expiresIn: authFullData?.token?.expiresIn,
            expiresAt: authFullData?.token?.expiresAt,
            refreshToken: authFullData?.token?.refreshToken,
            tokenData: authFullData?.token?.tokenData,
          }
        : null
    );

    this.dispatchUserData(
      logged
        ? {
            userName: authFullData?.userData?.userName,

            email: authFullData?.userData?.email,
            fullName: authFullData?.userData?.fullName,
            firstName: authFullData?.userData?.firstName,
            lastName: authFullData?.userData?.lastName,
            photoUrl: authFullData?.userData?.photoUrl,

            locale: authFullData?.userData?.locale,

            providerAuthId: authFullData?.userData?.providerAuthId,
          }
        : null
    );

    this.dispatchUserPermissions(
      logged
        ? {
            isLogged: authFullData?.userPermissions?.isLogged,
            isAnonymous: !logged,
            isAdmin: authFullData?.userPermissions?.isAdmin,
            userRoles: authFullData?.userPermissions?.userRoles,
          }
        : null
    );

    this.dispatchExtraData(logged ? authFullData?.extraData : null);

    // this.dispatchAuthenticationEndProcess(logged, loadedFromStore);
  }

  // -------------------------------------------------------

  public dispatchLoginAuthData(data?: any): void {
    this.dispatchAuthData(true, data, false);
  }

  public dispatchLogoutAuthData(data?: any): void {
    this.dispatchAuthData(false, data, false);
  }

  public dispatchRefreshTokenAuthData(data?: any): void {
    this.dispatchToken(
      data
        ? {
            tokenType: data?.tokenType,
            idToken: data?.idToken,
            accessToken: data?.accessToken,
            expiresIn: data?.expiresIn,
            expiresAt: data?.expiresAt,
            refreshToken: data?.refreshToken,
            tokenData: data?.tokenData,
          }
        : null
    );
  }

  // -------------------------------------------------------

  public abstract hasPermissions(roles: string[], operator: string): boolean;

  // -------------------------------------------------------
}
