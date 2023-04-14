import { AuthDataModel } from "@app/core/auth/store/model";

import { StateToken } from '@ngxs/store';

export const AUTH_STATE_TOKEN = new StateToken<AuthDataModel>('auth');
