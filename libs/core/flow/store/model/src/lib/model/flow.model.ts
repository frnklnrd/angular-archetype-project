import { FlowActionModel } from '@app/core/flow/api';
import { FlowStatusModel } from './flow-status.model';

export interface FlowModel {
  stack: FlowActionModel[];

  status: FlowStatusModel | null;
}
