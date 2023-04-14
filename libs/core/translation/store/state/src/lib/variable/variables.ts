import { TranslationDataModel } from '@app/core/translation/store/model';
import { StateToken } from '@ngxs/store';

export const TRANSLATION_STATE_TOKEN = new StateToken<TranslationDataModel>(
  'translation'
);
