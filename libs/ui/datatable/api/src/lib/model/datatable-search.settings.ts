/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortType } from '@swimlane/ngx-datatable';

export interface DatatableSearchSettings {
  page: number;
  pageSize?: number;
  filters?: any;
  sorts?: any[];
  sortType?: SortType; // multi, // single
  groupRows?: boolean;
  groupRowsBy?: string;
}
