import {ColumnMode} from '@swimlane/ngx-datatable';
import {TemplateRef} from '@angular/core';

export interface DatatableViewSettings {
  columnMode: ColumnMode; // standard, force, flex,
  loadingIndicator: boolean;
  /*
  cssLtrClasses: {
    sortAscending: string;
    sortDescending: string;
    pagerLeftArrow: string;
    pagerRightArrow: string;
    pagerPrevious: string;
    pagerNext: string;
  };
  cssRtlClasses: {
    sortAscending: string;
    sortDescending: string;
    pagerLeftArrow: string;
    pagerRightArrow: string;
    pagerPrevious: string;
    pagerNext: string;
  };
  */
  rowClass: (row: any) => any;
  headerHeight: number;
  rowHeight: number | 'auto' | ((row?: any) => number); // 45
  rowDetailsTemplate?: TemplateRef<any>;
  groupExpansionDefault?: boolean;
  groupRowsHeaderTemplate?: TemplateRef<any>;
  groupRowsHeaderHeight?: number;
  footerHide?: boolean;
  footerShowCustomTemplate?: boolean;
  footerHeight?: number;
  footerMobileHeight?: number;
  footerTabletHeight?: number;
  footerDesktopHeight?: number;
  reorderable: boolean;
  swapColumns: boolean;
  scrollbarH: boolean;
  scrollbarV: boolean;
  virtualization: boolean;
  toggleRowDetailByWindowSize: boolean;
  tableClasses?: string;
}
