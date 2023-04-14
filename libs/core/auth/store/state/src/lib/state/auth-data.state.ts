/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  AuthPayloadModel,
  AuthProviderModel,
  AuthTokenModel,
  AuthUserDataModel,
  AuthUserPermissionsModel
} from '@app/core/auth/api';
import {
  AuthChangeExtraDataAction,
  AuthChangeIsDataLoadedFromStorageAction,
  AuthChangePayloadAction,
  AuthChangeProviderAction,
  AuthChangeTokenAction,
  AuthChangeUserDataAction,
  AuthChangeUserPermissionsAction,
  AuthDoLoginSuccessfullyAction,
  AuthDoLogoutSuccessfullyAction
} from '@app/core/auth/store/action';
import { AuthDataModel } from '@app/core/auth/store/model';
import { AbstractDataState } from '@app/core/ddd/api';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AUTH_STATE_TOKEN } from '../variable/auth-data.state-token';

@State<AuthDataModel>({
  name: AUTH_STATE_TOKEN,
  defaults: AuthDataState.getStoredDefaultsValue(),
})
@Injectable()
export class AuthDataState extends AbstractDataState {
  static override getStoredDefaultsValue(): AuthDataModel {
    return {
      provider: null,
      payload: null,
      token: null,
      userData: null,
      userPermissions: null,
      extraData: null,
      loadedFromStore: true,
      logged: false,
    };
  }

  static override getStoredKeys(prefix: string = ''): string[] {
    return [
      'logged',
      'payload',
      'provider',
      'token',
      'userData',
      'userPermissions',
      'userData',
    ].map(
      (key) =>
        (prefix && prefix !== '' ? prefix + '.' : '') + 'auth' + '.' + key
    );
  }

  // ----------------------------------------------------------

  @Selector()
  static getPayload(state: AuthDataModel): AuthPayloadModel | null {
    return state.payload;
  }

  @Selector()
  static getProvider(state: AuthDataModel): AuthProviderModel | null {
    return state.provider;
  }

  @Selector()
  static getToken(state: AuthDataModel): AuthTokenModel | null {
    return state.token;
  }

  @Selector()
  static getUserData(state: AuthDataModel): AuthUserDataModel | null {
    return state.userData;
  }

  @Selector()
  static getUserPermissions(
    state: AuthDataModel
  ): AuthUserPermissionsModel | null {
    return state.userPermissions;
  }

  @Selector()
  static getExtraData(state: AuthDataModel): any | null {
    return state.extraData;
  }

  @Selector()
  static isLogged(state: AuthDataModel): boolean | null {
    return state.logged;
  }

  @Selector()
  static getIsDataLoadedFromStorage(state: AuthDataModel): boolean | null {
    return state.loadedFromStore;
  }

  // ----------------------------------------------------------

  @Action(AuthChangePayloadAction)
  changePayload(
    ctx: StateContext<AuthDataModel>,
    action: AuthChangePayloadAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      payload: action.payload,
    });
  }

  @Action(AuthChangeProviderAction)
  changeProvider(
    ctx: StateContext<AuthDataModel>,
    action: AuthChangeProviderAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      provider: action.provider,
    });
  }

  @Action(AuthChangeTokenAction)
  changeToken(
    ctx: StateContext<AuthDataModel>,
    action: AuthChangeTokenAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      token: action.token,
    });
  }

  @Action(AuthChangeUserDataAction)
  changeUserData(
    ctx: StateContext<AuthDataModel>,
    action: AuthChangeUserDataAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      userData: action.userData,
    });
  }

  @Action(AuthChangeUserPermissionsAction)
  changeUserPermissions(
    ctx: StateContext<AuthDataModel>,
    action: AuthChangeUserPermissionsAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      userPermissions: action.userPermissions,
    });
  }

  @Action(AuthChangeExtraDataAction)
  changeExtraData(
    ctx: StateContext<AuthDataModel>,
    action: AuthChangeExtraDataAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      extraData: action.extraData,
    });
  }

  @Action(AuthChangeIsDataLoadedFromStorageAction)
  setDataLoadedFromStorage(
    ctx: StateContext<AuthDataModel>,
    action: AuthChangeIsDataLoadedFromStorageAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      logged: action.loadedFromStorage,
      loadedFromStore: true,
    });
  }

  @Action(AuthDoLoginSuccessfullyAction)
  doLoginSuccessfully(
    ctx: StateContext<AuthDataModel>,
    action: AuthDoLoginSuccessfullyAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      logged: action.loggedIn,
      loadedFromStore: false,
    });
  }

  @Action(AuthDoLogoutSuccessfullyAction)
  doLogoutSuccessfully(
    ctx: StateContext<AuthDataModel>,
    action: AuthDoLogoutSuccessfullyAction
  ): void {
    // const state = ctx.getState();
    ctx.patchState({
      logged: !action.loggedOut,
      loadedFromStore: false,
    });
  }
}
