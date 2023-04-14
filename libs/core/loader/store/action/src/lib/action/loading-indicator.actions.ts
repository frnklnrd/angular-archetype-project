import { Observable } from 'rxjs';

export class LoadingIndicatorWaitForAction {
  static readonly type = '[LOADING INDICATOR] Init';

  constructor(
    public obs: Observable<boolean | null> | Promise<boolean | null>,
    public description: string = ''
  ) {}
}

export class LoadingIndicatorStopForAction {
  static readonly type = '[LOADING INDICATOR] Stop';

  constructor(public pid: string) {}
}
