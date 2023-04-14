/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { inject, Injectable } from '@angular/core';
import {
  BooksPaginatedDataModel,
  BooksResetDataAction,
  BooksSetListPaginatedDataAction,
  BooksSetListResponseDataAction,
  BooksSetListResponseErrorAction,
} from '@app/apps/app/module/books/store';
import { AbstractFacadeService } from '@app/core/ddd/api';
import { Book, BookService } from '@app/vendor/api-client/book-monkey-v4';
import { Store } from '@ngxs/store';
import { filter, map, Observable, Subject, switchMap, take } from 'rxjs';

@Injectable()
export class BooksFacadeService extends AbstractFacadeService {
  protected store: Store = inject<Store>(Store);

  protected booksApi: BookService = inject<BookService>(BookService);

  constructor() {
    super();
  }

  public reset(): void {
    this.store.dispatch(new BooksResetDataAction({}));
  }

  public clearBooksResponse(): Observable<any> {
    return this.store.dispatch(new BooksSetListResponseDataAction([], true));
  }

  public loadBooksData(params: any, force?: boolean): Observable<any> {
    this.logger.console.log(this.__classname, 'loadBooksData', params);

    const paginationParams = Object.assign({}, params, {
      items: [],
      selected: [],
    });

    this.logger.console.log(
      this.__classname,
      'paginationParams',
      paginationParams
    );

    const result$: Subject<any> = new Subject();

    this.clearBooksResponse()
      .pipe(
        take(1),
        map((data) => force),
        filter((data) => data === true),
        switchMap((data) => {
          return this.booksApi.booksGet();
        }),
        map((response: Book[]) => {
          const books: Book[] = [];
          response.forEach((item, i) => {
            const thumbnailUrl: string = (item?.thumbnails as any[])[0].url;
            const book = {
              ...item,
              no: i + 1,
              price: 12.34 * (i + 1),
              firstThumbnailUrl:
                thumbnailUrl.startsWith('https://') ||
                thumbnailUrl.startsWith('http://')
                  ? thumbnailUrl
                  : '/assets/images/books/no-cover.png',
            };
            books.push(book);
          });
          return books;
        })
      )
      .subscribe(
        (result) => {
          // updating store

          this.store.dispatch(new BooksSetListResponseDataAction(result));

          const pagedData = this.createPaginatedData(result, paginationParams);

          this.logger.console.log(
            this.__classname,
            'result -> pagedData',
            pagedData
          );

          this.store.dispatch(new BooksSetListPaginatedDataAction(pagedData));

          // return result

          result$.next(pagedData);

          result$.complete();
        },
        (error) => {
          // return error

          this.store.dispatch(new BooksSetListResponseErrorAction(error));
          result$.next(null);
          result$.complete();
        }
      );

    return result$.asObservable();
  }

  protected createPaginatedData(
    result: Book[],
    paginationParams: BooksPaginatedDataModel
  ): any {
    // sort

    const sortedItems = [...result];

    if (paginationParams.sorts && paginationParams.sorts.length > 0) {
      const sort: any = paginationParams.sorts[0];

      sortedItems.sort((a: Book, b: Book) => {
        if ((a as any)[sort.prop] < (b as any)[sort.prop]) {
          return sort.dir === 'asc' ? -1 : 1;
        }
        if ((a as any)[sort.prop] > (b as any)[sort.prop]) {
          return sort.dir === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    // filter for current page

    const filteredItems = sortedItems
      ? sortedItems.filter(
          (item, i, array) =>
            paginationParams.page * paginationParams.pageSize <= i &&
            i < (paginationParams.page + 1) * paginationParams.pageSize
        )
      : [];

    // create Paged Data

    const pagedData: BooksPaginatedDataModel = {
      items: [...filteredItems],
      selected: [],

      total: result.length,
      page: paginationParams.page,
      pageSize: paginationParams.pageSize,

      sorts: paginationParams.sorts,
    };

    return pagedData;
  }

  // POST
  // createBook(book: Book): Observable<void> {
  //   return new Observable<void>(subscriber => {
  //     const subscription = this.booksApi.bookPost(book).subscribe(
  //       (response) => {
  //         // Here you can save the response if is necessary.
  //         subscriber.next();
  //       },
  //       (err) => subscriber.error(err),
  //       () => subscriber.complete(),
  //     );
  //     this.state.loader.waitFor(subscription);
  //   });
  // }
}
