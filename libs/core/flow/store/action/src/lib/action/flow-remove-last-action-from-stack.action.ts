export class FlowRemoveLastActionFromStackAction {
  static readonly type = '[FLOW] Remove Last Action from Stack';

  constructor(public remove: boolean) {}
}
