export class TranslationChangeTextDirectionInvertedAction {

  static readonly type = '[TRANSLATION] Change Text Direction Inverted';

  constructor(public textDirectionInverted: boolean) {
  }

};
