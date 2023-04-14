import { AbstractService } from '@app/core/api';

export abstract class AbstractFacadeService extends AbstractService {
  protected constructor() {
    super();
  }

  public abstract reset(): void;
}
