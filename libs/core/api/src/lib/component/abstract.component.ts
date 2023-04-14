/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LoadingIndicatorManagerService } from '@app/core/loader/manager';
import { CodeValidatorService } from '@app/util/code/validation';
import { LoggerService } from '@app/util/logger/manager';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  template: '',
})
export abstract class AbstractComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked
{
  protected readonly __classname: string;

  // ---------------------------------------------------------------------

  private readonly __codeValidator: CodeValidatorService =
    inject<CodeValidatorService>(CodeValidatorService);

  private readonly __children: Map<string, Component> = new Map<
    string,
    Component
  >();

  private readonly __subscriptions: Subscription = new Subscription();

  protected readonly logger: LoggerService =
    inject<LoggerService>(LoggerService);

  private loader: LoadingIndicatorManagerService =
    inject<LoadingIndicatorManagerService>(LoadingIndicatorManagerService);

  private processing$: Map<string, Subject<boolean>> = new Map();

  // ---------------------------------------------------------------------

  @Output() init: EventEmitter<Component> = new EventEmitter<Component>();

  @Output() destroy: EventEmitter<Component> = new EventEmitter<Component>();

  // ---------------------------------------------------------------------

  protected constructor() {
    this.__classname = this.constructor.name;

    this.__codeValidator.checkFunctionsCallsToSuperMethods(this, [
      'ngOnInit',
      'ngOnChanges',
      'ngOnDestroy',
      'ngAfterViewInit',
      'ngAfterViewChecked',
    ]);
  }

  // ---------------------------------------------------------------------

  ngOnInit(): void {
    this.init.emit(this as Component);
  }

  /*
  protected onWindowWidthResized(): void {
  }
  */

  // ---------------------------------------------------------------------

  ngOnDestroy(): void {
    this.__subscriptions.unsubscribe();

    this.processing$.forEach((value$, key) => {
      value$.next(false);
      value$.complete();
      value$.unsubscribe();
    });
    this.processing$.clear();

    this.destroy.emit(this as Component);
  }

  // ---------------------------------------------------------------------

  ngOnChanges(changes: SimpleChanges): void {
    //
  }

  // ---------------------------------------------------------------------

  ngAfterViewInit(): void {
    //
  }

  // ---------------------------------------------------------------------

  ngAfterViewChecked(): void {
    //
  }

  // ---------------------------------------------------------------------

  protected addSubscription(subscription?: Subscription): void {
    if (subscription) {
      this.__subscriptions.add(subscription);
    }
  }

  // ---------------------------------------------------------------------

  public registerChild(id: string, child: Component): void {
    if (this.__children.has(id)) {
      const error = 'Child with id [' + id + '] is already registered.';
      throw new Error(error);
    }
    this.__children.set(id, child);
  }

  public getRegisteredChild(id: string): Component | undefined {
    return this.__children.get(id);
  }

  // ---------------------------------------------------------------------

  private getIdForLoader(processId: string = ''): string {
    return (
      'loader-process-' +
      this.__classname +
      '-' +
      processId
    ).toLowerCase();
  }
  protected startLoader(processId: string = ''): void {
    const pId: string = this.getIdForLoader(processId);
    const pDescription = '[' + this.__classname + ']: ' + processId;

    let process$: Subject<boolean> | null = null;
    if (this.processing$.has(pId)) {
      process$ = this.processing$.get(pId) as Subject<boolean>;
    } else {
      process$ = new BehaviorSubject<boolean>(false);
      this.processing$.set(pId, process$);
    }
    process$.next(true);
    this.loader.waitFor(process$.asObservable(), pDescription);
  }

  protected endLoader(processId: string = ''): void {
    const pId: string = this.getIdForLoader(processId);
    let process$: Subject<boolean> | null = null;
    if (this.processing$.has(pId)) {
      process$ = this.processing$.get(pId) as Subject<boolean>;
      process$?.next(false);
    }
  }

  // ---------------------------------------------------------------------
}
