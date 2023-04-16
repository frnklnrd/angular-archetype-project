/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { BooksFacadeService } from '@app/apps/app/module/books/domain';
import { BooksDataState } from '@app/apps/app/module/books/store';
import { AbstractFeatureComponent } from '@app/core/ddd/api';
import { FlowManagerService } from '@app/core/flow/manager';
import {
  DatatableDataSettings,
  DatatableSearchSettings,
} from '@app/ui/datatable/api';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent
  extends AbstractFeatureComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  // ----------------------------------------------------------
  // PROPERTIES
  // ----------------------------------------------------------

  selected: any[] = [];

  searchParams: DatatableSearchSettings = {
    page: 0,
    pageSize: 5,
    filters: {},
    sorts: [],
  };

  pagedData: DatatableDataSettings = BooksDataState.getListDataDefaultValue();

  // ----------------------------------------------------------
  // SERVICES
  // ----------------------------------------------------------

  private booksFacade: BooksFacadeService =
    inject<BooksFacadeService>(BooksFacadeService);

  private flow: FlowManagerService =
    inject<FlowManagerService>(FlowManagerService);

  // ----------------------------------------------------------
  // OBSERVABLES
  // ----------------------------------------------------------

  @Select(BooksDataState.getBooksPaginatedData)
  private pagedDataSettings$!: Observable<DatatableDataSettings>;

  // ----------------------------------------------------------

  constructor() {
    super();
  }

  // ----------------------------------------------------------

  override ngOnInit(): void {
    super.ngOnInit();

    this.addSubscription(
      this.pagedDataSettings$
        // .pipe(skip(1))
        .subscribe((data: DatatableDataSettings) => {
          this.pagedData = {
            ...this.pagedData,
            ...data,
            ...{ selected: [...this.selected] },
          };
        })
    );

    this.loadBooksData({ ...this.searchParams }, true);
  }

  // ----------------------------------------------------------

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.booksFacade.reset();
  }

  // ----------------------------------------------------------

  protected loadBooksData(eventData: any, force: boolean = false): void {
    this.logger.console.log(
      this.__classname,
      'loadBooksData -> eventData',
      eventData
    );

    this.searchParams = { ...this.searchParams, ...eventData };

    this.logger.console.log(
      this.__classname,
      'loadBooksData -> searchParams',
      this.searchParams
    );

    this.startLoader('loadBooksData');

    this.booksFacade
      .loadBooksData(this.searchParams, true)
      .subscribe((result) => {
        this.endLoader('loadBooksData');
      });
  }

  // ----------------------------------------------------------

  goToAdd(): void {
    this.flow.startAction('', 'books', 'add', 'step1').then();
  }

  // ----------------------------------------------------------

  onPage($event: any): void {
    this.logger.console.log(this.__classname, 'onPage', $event);
    this.loadBooksData({ _eventName: 'page', ...$event });
  }

  onSort($event: any): void {
    this.logger.console.log(this.__classname, 'onSort', $event);
    this.loadBooksData({ _eventName: 'sort', ...$event });
  }

  onSelect($event: any): void {
    this.logger.console.log(this.__classname, 'onSelect', $event);
    this.selected = [...$event.selected];
  }

  // ---------------------------------------------------------------------------------
}
