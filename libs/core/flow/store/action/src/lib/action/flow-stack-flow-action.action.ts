import { FlowActionModel } from "@app/core/flow/api";

export class FlowStackFlowActionAction {
  static readonly type = '[FLOW] Stack Flow Action';

  constructor(public flowAction: FlowActionModel) {}
}
