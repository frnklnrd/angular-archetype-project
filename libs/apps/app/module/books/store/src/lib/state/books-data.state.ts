/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { AbstractDataState } from '@app/core/ddd/api';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BooksResetDataAction } from '../action/books-reset-data.action';
import { BooksSetListPaginatedDataAction } from '../action/books-set-list-paginated-data.action';
import { BooksSetListResponseDataAction } from '../action/books-set-list-response-data.action';
import { BooksSetListResponseErrorAction } from '../action/books-set-list-response-error.action';
import { BooksDataModel } from '../model/books-data.model';
import { BooksPaginatedDataModel } from '../model/books-paginated-data.model';
import { BOOKS_STATE_TOKEN } from '../variable/variables';

@State<BooksDataModel>({
  name: BOOKS_STATE_TOKEN,
  defaults: BooksDataState.getStoredDefaultsValue(),
})
@Injectable()
export class BooksDataState extends AbstractDataState {
  static override getStoredDefaultsValue(): any {
    return {
      listResponse: {
        data: [],
        error: null,
      },
      listData: BooksDataState.getListDataDefaultValue(),
      editResponse: {
        data: [],
        error: null,
      },
      editData: null,
    };
  }

  static override getStoredKeys(prefix: string = ''): string[] {
    return [];
  }

  // ----------------------------------------------------------

  static getListDataDefaultValue(): any {
    return {
      items: [],
      total: 0,
      page: 0,
      pageSize: 20,
      sorts: [],
      selected: [],
    };
  }

  // ----------------------------------------------------------

  @Selector()
  static getBooksPaginatedData(state: BooksDataModel): BooksPaginatedDataModel {
    return state.listData;
  }

  // ----------------------------------------------------------

  @Action(BooksSetListResponseDataAction)
  setListResponseData(
    ctx: StateContext<BooksDataModel>,
    action: BooksSetListResponseDataAction
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      listResponse: {
        data: action.data,
        error: action.resetError ? null : state.listResponse.error,
      },
    });
  }

  // ----------------------------------------------------------

  @Action(BooksSetListResponseErrorAction)
  setListResponseError(
    ctx: StateContext<BooksDataModel>,
    action: BooksSetListResponseErrorAction
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      listResponse: {
        data: action.resetData ? null : state.listResponse.data,
        error: action.error,
      },
    });
  }

  // ----------------------------------------------------------

  @Action(BooksSetListPaginatedDataAction)
  setListPaginatedData(
    ctx: StateContext<BooksDataModel>,
    action: BooksSetListPaginatedDataAction
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      listData: {
        items: action.data.items,
        total: action.data.total,
        page: action.data.page,
        pageSize: action.data.pageSize,
        sorts: action.data.sorts,
        selected: action.data.selected,
      },
    });
  }

  // ----------------------------------------------------------

  @Action(BooksResetDataAction)
  resetDataAction(
    ctx: StateContext<BooksDataModel>,
    action: BooksResetDataAction
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      ...BooksDataState.getStoredDefaultsValue(),
    });
  }

  // ----------------------------------------------------------
}
