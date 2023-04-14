/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */

export interface AuthManagerService {
  // -------------------------------------------------

  init(data?: any): Promise<boolean>;

  // -------------------------------------------------

  isProviderEnabled(providerKey: string): boolean;

  configureAsDefault(
    defaultProviderKey: string | null,
    defaultAuthData?: any | null
  ): Promise<boolean>;

  // -------------------------------------------------

  login(loginData?: any): Promise<any>;

  logout(logoutData?: any): Promise<boolean>;

  refreshToken(refreshTokenData?: any): Promise<boolean>;

  dispatchLoginSuccessfully(): Promise<boolean>;

  dispatchLogoutSuccessfully(): Promise<boolean>;

  dispatchRefreshTokenSuccessfully(): Promise<boolean>;

  // -------------------------------------------------------

  dispatchLoginAuthData(data?: any): void;

  dispatchLogoutAuthData(data?: any): void;

  dispatchRefreshTokenAuthData(data?: any): void;

  // -------------------------------------------------------

  hasPermissions(roles: string[], operator: string): boolean;

  // -------------------------------------------------------
}
