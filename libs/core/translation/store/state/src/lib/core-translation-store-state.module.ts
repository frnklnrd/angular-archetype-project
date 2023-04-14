import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationDataState } from './state/translation-data.state';

@NgModule({
  imports: [CommonModule],
  providers: [TranslationDataState],
})
export class CoreTranslationStoreStateModule {}
