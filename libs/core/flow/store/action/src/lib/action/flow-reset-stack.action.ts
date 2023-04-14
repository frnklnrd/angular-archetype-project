export class FlowResetStackAction {
  static readonly type = '[FLOW] Reset Stack';

  constructor(public reset: boolean) {}
}
