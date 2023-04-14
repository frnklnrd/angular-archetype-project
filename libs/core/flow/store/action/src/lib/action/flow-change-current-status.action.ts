import { FlowStatusModel } from '@app/core/flow/store/model';

export class FlowChangeCurrentStatusAction {
  static readonly type = '[FLOW] Change Current Status';

  constructor(public status: FlowStatusModel) {}
}
