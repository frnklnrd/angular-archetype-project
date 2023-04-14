/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/member-ordering */
import { inject, Injectable } from '@angular/core';
import { AbstractDataState } from '@app/core/ddd/api';
import {
  TranslationChangeCurrentLangAction,
  TranslationChangeDateFormatAction,
  TranslationChangeDefaultLangAction,
  TranslationChangeTextDirectionAction,
  TranslationChangeTextDirectionInvertedAction,
} from '@app/core/translation/store/action';
import { TranslationDataModel } from '@app/core/translation/store/model';

import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { TRANSLATION_STATE_TOKEN } from '../variable/variables';

@State<TranslationDataModel>({
  name: TRANSLATION_STATE_TOKEN,
  defaults: TranslationDataState.getStoredDefaultsValue(),
})
@Injectable()
export class TranslationDataState extends AbstractDataState {
  static override getStoredDefaultsValue(): TranslationDataModel {
    return {
      defaultLanguage: 'en',
      currentLanguage: 'en',
      dateFormat: 'YYYY-MM-dd',
      textDirection: 'ltr',
      textDirectionInverted: false,
    };
  }

  static override getStoredKeys(prefix: string = ''): string[] {
    return [
      'defaultLanguage',
      'currentLanguage',
      'dateFormat',
      'textDirection',
      'textDirectionInverted',
    ].map(
      (key) =>
        (prefix && prefix !== '' ? prefix + '.' : '') +
        'translation' +
        '.' +
        key
    );
  }

  // ----------------------------------------------------------

  protected store: Store = inject<Store>(Store);

  // ----------------------------------------------------------

  @Selector()
  static getDefaultLanguage(state: TranslationDataModel): string {
    return state.defaultLanguage;
  }

  @Action(TranslationChangeDefaultLangAction)
  changeDefaultLanguage(
    ctx: StateContext<TranslationDataModel>,
    action: TranslationChangeDefaultLangAction
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      defaultLanguage: action.lang,
    });
  }

  // ----------------------------------------------------------

  @Selector()
  static getCurrentLanguage(state: TranslationDataModel): string {
    return state.currentLanguage;
  }

  @Action(TranslationChangeCurrentLangAction)
  changeCurrentLanguage(
    ctx: StateContext<TranslationDataModel>,
    action: TranslationChangeCurrentLangAction
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      currentLanguage: action.lang,
    });
    this.updateAllDependencies(ctx, action);
  }

  // ----------------------------------------------------------

  @Selector()
  static getDateFormat(state: TranslationDataModel): string {
    return state.dateFormat;
  }

  @Action(TranslationChangeDateFormatAction)
  changeAppDateFormat(
    ctx: StateContext<TranslationDataModel>,
    action: TranslationChangeDateFormatAction
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      dateFormat: action.dateFormat,
    });
  }

  // ----------------------------------------------------------

  @Selector()
  static getTextDirection(state: TranslationDataModel): string {
    return state.textDirection;
  }

  @Action(TranslationChangeTextDirectionAction)
  changeAppTextDirection(
    ctx: StateContext<TranslationDataModel>,
    action: TranslationChangeTextDirectionAction
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      textDirection: action.textDirection,
    });
  }

  // ----------------------------------------------------------

  @Selector()
  static getTextDirectionInverted(state: TranslationDataModel): boolean {
    return state.textDirectionInverted;
  }

  @Action(TranslationChangeTextDirectionInvertedAction)
  changeTextDirectionInverted(
    ctx: StateContext<TranslationDataModel>,
    action: TranslationChangeTextDirectionInvertedAction
  ) {
    const state = ctx.getState();
    ctx.patchState({
      textDirectionInverted: action.textDirectionInverted,
    });
  }

  // ----------------------------------------------------------

  protected updateAllDependencies(
    ctx: StateContext<TranslationDataModel>,
    action: TranslationChangeCurrentLangAction
  ): void {
    const availableLanguagesConfig: any[] = this.store.selectSnapshot<any[]>(
      (state) => state.config.translation.languages
    );

    let currentLanguageConfig = availableLanguagesConfig.find(
      (lang) => lang.key == action.lang
    );

    if (!currentLanguageConfig) {
      currentLanguageConfig = availableLanguagesConfig.find(
        (lang) => lang.default
      );
    }

    const state = ctx.getState();

    if (currentLanguageConfig) {
      ctx.patchState({
        dateFormat: currentLanguageConfig?.dateFormat,
        textDirection: currentLanguageConfig?.textDirection,
        textDirectionInverted: currentLanguageConfig?.textDirection !== 'ltr',
      });
    }
  }
}
