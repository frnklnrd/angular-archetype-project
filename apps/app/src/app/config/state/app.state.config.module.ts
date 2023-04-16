/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { UtilCryptoManagerModule } from '@app/util/crypto/manager';
import {
  UtilStorageLocalModule,
  UtilStoreLocalStoreEngineManagerService,
} from '@app/util/storage/local';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import {
  NavigationActionTiming,
  NgxsRouterPluginModule,
} from '@ngxs/router-plugin';
import { NgxsStoragePluginModule, STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { NgxsModule, getActionTypeFromInstance } from '@ngxs/store';
import {
  UTIL_STORE_LOCAL_STORAGE_PREFIX_KEY,
  UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_KEYS,
  UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_VALUES,
} from 'libs/util/storage/local/src/lib/variable/variables';
import { APP_ENV_CONFIG } from '../_env/app.env.loader';

import {
  APP_STORE_ALL_APP_STATES,
  APP_STORE_KEYS_TO_STORAGE,
} from './app.state.config';

const pluginModulesForDevMode: ModuleWithProviders<any>[] = [];

if (!APP_ENV_CONFIG.production) {
  pluginModulesForDevMode.push(
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: APP_ENV_CONFIG.production,
    })
  );

  pluginModulesForDevMode.push(
    NgxsLoggerPluginModule.forRoot({
      disabled: APP_ENV_CONFIG.production,
      collapsed: true,
      filter: (action) => {
        const actionName: string | undefined =
          getActionTypeFromInstance(action);
        return actionName ? actionName.indexOf('[FLOW]') === -1 : true;
      },
    })
  );
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //-----------------
    // App State
    //-----------------
    NgxsModule.forRoot([...APP_STORE_ALL_APP_STATES], {
      developmentMode: !APP_ENV_CONFIG.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: [...APP_STORE_KEYS_TO_STORAGE],
      // deserialize: JSON.parse,
      // serialize: JSON.stringify
    }),
    // ---------------------------
    NgxsRouterPluginModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    // ---------------------------
    ...pluginModulesForDevMode,
    // ---------------------------
    UtilCryptoManagerModule,
    UtilStorageLocalModule,
  ],
  providers: [
    {
      provide: UTIL_STORE_LOCAL_STORAGE_PREFIX_KEY,
      useValue: APP_ENV_CONFIG._VARS.APP_PACKAGE_NAME,
    },
    {
      provide: UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_KEYS,
      useValue: APP_ENV_CONFIG.production,
    },
    {
      provide: UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_VALUES,
      useValue: APP_ENV_CONFIG.production,
    },
    {
      provide: STORAGE_ENGINE,
      useExisting: UtilStoreLocalStoreEngineManagerService,
    },
  ],
  exports: [],
})
export class AppStateConfigModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppStateConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppStateConfigModule is already loaded. Import it in the main config module only.'
      );
    }
  }
}
