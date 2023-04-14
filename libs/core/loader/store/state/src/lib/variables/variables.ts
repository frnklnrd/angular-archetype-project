import { LoadingIndicatorModel } from '@app/core/loader/store/model';
import { StateToken } from '@ngxs/store';

export const CORE_LOADING_STATE_TOKEN = new StateToken<LoadingIndicatorModel>(
  'loading'
);
