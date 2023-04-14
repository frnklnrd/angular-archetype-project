import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  UtilCryptoManagerModule,
  UTIL_CRYPTO_SECRET_KEY,
} from '@app/util/crypto/manager';
import { APP_ENV_CONFIG } from '../_env/app.env.loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //-----------------
    UtilCryptoManagerModule,
  ],
  providers: [
    {
      provide: UTIL_CRYPTO_SECRET_KEY,
      useValue: APP_ENV_CONFIG._VARS.UTIL_CRYPTO_SECRET_KEY,
    },
  ],
  exports: [],
})
export class AppCryptoConfigModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppCryptoConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppCryptoConfigModule is already loaded. Import it in the main config module only.'
      );
    }
  }
}
