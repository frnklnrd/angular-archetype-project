import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule, StaticClassProvider } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export class DynamicLocaleId extends String {
  constructor(protected service: TranslateService) {
    super('');
  }

  public override toString(): string {
    return this.service.currentLang ? this.service.currentLang : 'en';
  }
}

export const LocaleProvider: StaticClassProvider = {
  provide: LOCALE_ID,
  useClass: DynamicLocaleId,
  deps: [TranslateService],
};

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, TranslateModule],
  providers: [
    // ----------------
    LocaleProvider,
    // ----------------
  ],
  exports: [TranslateModule],
})
export class VendorTranslationNgxTranslateModule {}
