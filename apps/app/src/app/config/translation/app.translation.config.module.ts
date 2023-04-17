import {
  CommonModule,
  registerLocaleData as ngRegisterLocaleData,
} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import ngLocaleAr from '@angular/common/locales/ar';
import ngLocaleEn from '@angular/common/locales/en';
import ngLocaleEs from '@angular/common/locales/es';
import { NgModule, Optional, SkipSelf, inject } from '@angular/core';
import {
  CoreTranslationManagerModule,
  TranslationManagerService,
} from '@app/core/translation/manager';
import { TranslationDataState } from '@app/core/translation/store/state';
import { VendorTranslationNgxTranslateModule } from '@app/vendor/translation/ngx-translate';

import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Select, Store } from '@ngxs/store';
import { defineLocale as bsDefineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import {
  arLocale as bsLocaleAr,
  enGbLocale as bsLocaleEn,
  esLocale as bsLocaleEs,
} from 'ngx-bootstrap/locale';
import { Observable } from 'rxjs';

ngRegisterLocaleData(ngLocaleEn, 'en');
ngRegisterLocaleData(ngLocaleEs, 'es');
ngRegisterLocaleData(ngLocaleAr, 'ar');

bsDefineLocale('en-gb', bsLocaleEn);
bsDefineLocale('es-es', bsLocaleEs);
bsDefineLocale('ar-ar', bsLocaleAr);

class CustomMissingTranslationHandler implements MissingTranslationHandler {
  constructor() {
    //
  }
  handle(params: MissingTranslationHandlerParams) {
    return `MISSING_TRANSLATION: [${params.key}]`;
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ----------------
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler,
        deps: [],
      },
    }),
    // ----------------
    VendorTranslationNgxTranslateModule,
    CoreTranslationManagerModule,
  ],
  providers: [],
  exports: [TranslateModule],
})
export class AppTranslationConfigModule {
  private store: Store = inject<Store>(Store);

  private translation: TranslationManagerService =
    inject<TranslationManagerService>(TranslationManagerService);

  private bsLocaleService: BsLocaleService =
    inject<BsLocaleService>(BsLocaleService);

  @Select(TranslationDataState.getCurrentLanguage)
  currentLanguage$!: Observable<string>;

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppTranslationConfigModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppTranslationConfigModule is already loaded. Import it in the main config module only.'
      );
    }

    this.init();
  }

  private init(): void {
    // this language will be used as a fallback when a translation isn't found in the current language

    const translationData = this.store.selectSnapshot(
      (state) => state.translation
    );

    // console.log('translationData', translationData);
    this.translation.init(
      'es',
      translationData?.currentLanguage ? translationData?.currentLanguage : 'es'
    );

    this.currentLanguage$.subscribe((currentLang) => {
      // bsLocaleService.use('en-gb');
      switch (currentLang) {
        case 'en':
          this.bsLocaleService.use('en-gb');
          break;
        case 'es':
          this.bsLocaleService.use('es-es');
          break;
        case 'ar':
          this.bsLocaleService.use('ar-ar');
          break;
        default:
          break;
      }
    });
  }
}
