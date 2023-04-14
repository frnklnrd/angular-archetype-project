/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { AbstractUiComponent } from '@app/core/ddd/api';
import { DatatableDataSettings } from '@app/ui/datatable/api';
import { BooksTableSettingsHandler } from '../../handler/books-table-settings.handler';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})
export class BooksTableComponent extends AbstractUiComponent implements OnInit {
  // --------------------------------------------------------------------------

  @Input() pagedDataSettings!: DatatableDataSettings;

  // --------------------------------------------------------------------------

  @Output() paged: EventEmitter<any> = new EventEmitter<any>();

  @Output() sorted: EventEmitter<any> = new EventEmitter<any>();

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  // --------------------------------------------------------------------------

  @ViewChild('rowsGroupHeaderTpl', { static: true, read: TemplateRef })
  rowsGroupHeaderTpl!: TemplateRef<any>;

  @ViewChild('rowDetailsTpl', { static: true, read: TemplateRef })
  rowDetailsTpl!: TemplateRef<any>;

  @ViewChild('fieldActionsTpl', { static: true, read: TemplateRef })
  fieldActionsTpl!: TemplateRef<any>;

  // --------------------------------------------------------------------------

  public booksTableSettingsHandler: BooksTableSettingsHandler =
    inject<BooksTableSettingsHandler>(BooksTableSettingsHandler);

  constructor() {
    super();
    this.booksTableSettingsHandler.init();
  }

  // --------------------------------------------------------------------------

  override ngOnInit(): void {
    super.ngOnInit();

    this.booksTableSettingsHandler.viewSettings.groupRowsHeaderTemplate =
      this.rowsGroupHeaderTpl;

    this.booksTableSettingsHandler.viewSettings.rowDetailsTemplate =
      this.rowDetailsTpl;

    this.booksTableSettingsHandler.columnsSettings?.columns?.map(
      (config: any) => {
        if (config.prop === 'actions' && this.fieldActionsTpl) {
          config.cellTemplate = this.fieldActionsTpl;
        }
        return config;
      }
    );
  }

  // --------------------------------------------------------------------------

  onPaged($event: any): void {
    this.paged.emit($event);
  }

  onSorted($event: any): void {
    this.sorted.emit($event);
  }

  onSelected($event: any): void {
    this.selected.emit($event);
  }

  // --------------------------------------------------------------------------
}
