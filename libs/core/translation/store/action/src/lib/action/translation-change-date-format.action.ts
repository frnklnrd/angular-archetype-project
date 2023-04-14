export class TranslationChangeDateFormatAction {

  static readonly type = '[TRANSLATION] Change Date Format';

  constructor(public dateFormat: string) {
  }

};
