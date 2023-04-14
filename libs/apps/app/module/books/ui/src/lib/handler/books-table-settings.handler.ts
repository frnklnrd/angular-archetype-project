/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Injector } from '@angular/core';
import {
  DatatableColumnsSettings,
  DatatableDataSettings,
  DatatableViewSettings,
} from '@app/ui/datatable/api';
import { DefaultDatatableSettingsHandler } from '@app/ui/datatable/default';
import { marker as _i18n } from '@biesbjerg/ngx-translate-extract-marker';
import { BookAuthorsPipe } from '../pipe/book-authors.pipe';
import { BookPricePipe } from '../pipe/book-price.pipe';
import { BookPublishedPipe } from '../pipe/book-published.pipe';
import { BookRatingPipe } from '../pipe/book-rating.pipe';
import { BookThumbnailPipe } from '../pipe/book-thumbnail.pipe';

@Injectable()
export class BooksTableSettingsHandler extends DefaultDatatableSettingsHandler {
  constructor(private injector: Injector) {
    super();
  }

  protected override getDefaultDataSettings(): DatatableDataSettings {
    const defaultDataSettings = {
      ...super.getDefaultDataSettings(),
      ...{
        rowIdentity: (row: any) => {
          return row.isbn;
        },
        displayCheck: (row: any, column: string, value: any) => {
          return row.rating < 5;
        },
        selectCheck: (row: any, column: string, value: any) => {
          return row.rating < 5;
        },
        sorts: [
          {
            prop: 'title',
            dir: 'asc',
          },
        ],
        // groupRows: true,
        // groupRowsBy: 'rating',
        // groupExpansionDefault: false,
      },
    };

    return defaultDataSettings;
  }

  protected override getDefaultColumnsSettings(): DatatableColumnsSettings {
    const defaultColumnsSettings = { ...super.getDefaultColumnsSettings() };

    defaultColumnsSettings.columns.push(
      ...[
        {
          name: _i18n('ui.datatable.attributes.#'),
          nameTranslation: true,
          prop: 'no',
          width: 50,
          resizeable: false,
          sortable: true,
          draggable: false,
          canAutoResize: false,
          headerClass: '',
          cellClass: '',
          // frozenLeft: true,
          // frozenRight: false,
        },
        {
          name: '',
          prop: 'firstThumbnailUrl',
          width: 60,
          resizeable: false,
          sortable: false,
          draggable: false,
          canAutoResize: false,
          pipe: this.injector.get(BookThumbnailPipe),
        },
        {
          name: _i18n('app.books.table.title.isbn'),
          nameTranslation: true,
          prop: 'isbn',
          width: 150,
          resizeable: false,
          sortable: true,
          draggable: false,
          canAutoResize: false,
        },
        {
          name: _i18n('app.books.table.title.title'),
          nameTranslation: true,
          prop: 'title',
          // width: 350,
          resizeable: true,
          sortable: true,
          draggable: false,
          canAutoResize: true,
        },
        {
          name: _i18n('app.books.table.title.authors'),
          nameTranslation: true,
          prop: 'authors',
          width: 100,
          resizeable: true,
          sortable: false,
          draggable: false,
          canAutoResize: true,
          pipe: this.injector.get(BookAuthorsPipe),
        },
        {
          name: _i18n('app.books.table.title.price'),
          nameTranslation: true,
          prop: 'price',
          width: 70,
          resizeable: false,
          sortable: true,
          draggable: false,
          canAutoResize: false,
          pipe: this.injector.get(BookPricePipe),
        },
        {
          name: _i18n('app.books.table.title.rating'),
          nameTranslation: true,
          prop: 'rating',
          width: 120,
          resizeable: false,
          sortable: true,
          draggable: false,
          canAutoResize: false,
          pipe: this.injector.get(BookRatingPipe),
        },
        {
          name: _i18n('app.books.table.title.published'),
          nameTranslation: true,
          prop: 'published',
          width: 100,
          resizeable: false,
          sortable: true,
          draggable: false,
          canAutoResize: false,
          pipe: this.injector.get(BookPublishedPipe),
        },
        {
          name: _i18n('app.books.table.title.actions'),
          nameTranslation: true,
          prop: 'actions',
          width: 80,
          resizeable: false,
          sortable: false,
          draggable: false,
          canAutoResize: false,
        },
      ]
    );

    return defaultColumnsSettings;
  }

  protected override getDefaultViewSettings(): DatatableViewSettings {
    const defaultViewSettings = {
      ...super.getDefaultViewSettings(),
      ...{
        tableClasses: 'striped bordered', // 'dark bordered',
        rowClass: (row: any) => {
          return {
            highRating: row.rating > 3,
            mediumRating: row.rating === 3,
            lowRating: row.rating < 3,
          };
        },
        toggleRowDetailByWindowSize: false,
        groupRowsHeaderHeight: 55,
        // footerHide: false,
        // footerShowCustomTemplate: true,
      },
    };
    return defaultViewSettings;
  }

  protected override getDefaultExtraSettings(): any {
    const defaultExtraSettings = {
      ...super.getDefaultExtraSettings(),
    };
    return defaultExtraSettings;
  }
}
