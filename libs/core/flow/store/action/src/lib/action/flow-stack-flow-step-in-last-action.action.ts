import { FlowStepModel } from "@app/core/flow/api";

export class FlowStackFlowStepInLastActionAction {
  static readonly type = '[FLOW] Stack Flow Step in Last Action';

  constructor(public flowStep: FlowStepModel) {}
}
