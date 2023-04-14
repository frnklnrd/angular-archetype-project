import { FlowModel } from '@app/core/flow/store/model';
import { StateToken } from '@ngxs/store';

export const FLOW_STATE_TOKEN = new StateToken<FlowModel>('flow');
