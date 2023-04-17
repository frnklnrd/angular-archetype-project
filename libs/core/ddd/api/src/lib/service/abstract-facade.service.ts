/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractService } from '@app/core/api';

export abstract class AbstractFacadeService extends AbstractService {
  protected constructor() {
    super();
  }

  protected base64encodeData(data: any): string {
    return btoa(JSON.stringify(data));
  }

  protected base64decodeData(data: string): any {
    return JSON.parse(atob(data));
  }

  public abstract reset(): void;
}
