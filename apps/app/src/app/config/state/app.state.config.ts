/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AuthDataState } from '@app/core/auth/store/state';
import { MenuDataState } from '@app/core/menu/store/state';
import { TranslationDataState } from '@app/core/translation/store/state';
import { State } from '@ngxs/store';
import { APP_API_CONFIG } from '../api/app.api.config';
import { APP_AUTH_CONFIG } from '../auth/app.auth.config';
import { APP_MENU_CONFIG } from '../menu/app.menu.config';

import { BooksDataState } from '@app/apps/app/module/books/store';
import { FlowDataState } from '@app/core/flow/store/state';
import { LoadingIndicatorState } from '@app/core/loader/store/state';
import { APP_ENV_CONFIG } from '../_env/app.env.loader';
import { APP_FLOW_CONFIG } from '../flow/app.flow.config';
import { APP_TRANSLATION_CONFIG } from '../translation/app.translation.config';

@State<any>({
  name: 'config',
  defaults: {
    _env: APP_ENV_CONFIG,
    api: {
      all_prefixes: [
        APP_API_CONFIG.book_monkey_v4_api_base_path,
        APP_API_CONFIG.suitecrm7_v8_api_base_path,
        APP_API_CONFIG.laravel9_api_base_path,
      ],
      paths: {
        book_monkey_v4: APP_API_CONFIG.book_monkey_v4_api_base_path,
        suitecrm7_v8: APP_API_CONFIG.suitecrm7_v8_api_base_path,
        laravel9: APP_API_CONFIG.laravel9_api_base_path,
      },
    },
    auth: {
      providers: APP_AUTH_CONFIG.providers,
    },
    interceptors: {
      fakeBackend: {
        config: '', //APP_HTTP_FAKE_BACKEND_INTERCEPTOR_CONFIG
      },
    },
    translation: {
      languages: APP_TRANSLATION_CONFIG.languages,
    },
    flow: {
      actions: APP_FLOW_CONFIG.actions,
      routes: APP_FLOW_CONFIG.routes,
    },
    menu: {
      sidebar: {
        main: APP_MENU_CONFIG.sidebar.main,
      },
      lang: {
        available: APP_MENU_CONFIG.lang.available,
      },
    },
    socket: {
      host_url: '', // APP_ENV_CONFIG.CORE_WEBSOCKET_SERVER_HOST
    },
  },
  children: [],
})
@Injectable()
export class ConfigDataState {}

@State<any>({
  name: 'app',
  defaults: {},
  children: [BooksDataState],
})
@Injectable()
export class AppState {}

export const APP_STORE_ALL_APP_STATES = [
  // ---------------------
  ConfigDataState,
  // ---------------------
  AuthDataState,
  // ---------------------
  FlowDataState,
  // ---------------------
  TranslationDataState,
  // ---------------------
  MenuDataState,
  // ---------------------
  LoadingIndicatorState,
  // ---------------------
  // Application
  // ---------------------
  AppState,
  // ---------------------
  BooksDataState,
  // ---------------------
].reverse();

export const APP_STORE_KEYS_TO_STORAGE = [
  // ---------------------
  ...AuthDataState.getStoredKeys(''),
  // ---------------------
  // ...FlowDataState.getStoredKeys(''),
  // ---------------------
  ...TranslationDataState.getStoredKeys(''),
  // ---------------------
  ...MenuDataState.getStoredKeys(''),
  // ---------------------
  ...LoadingIndicatorState.getStoredKeys(''),
  // ---------------------
];
