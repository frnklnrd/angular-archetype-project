import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { LoadingIndicatorState } from '@app/core/loader/store/state';
import { TranslationDataState } from '@app/core/translation/store/state';
import { LoggerService } from '@app/util/logger/manager';
import { IconSetService } from '@coreui/icons-angular';
import { Select } from '@ngxs/store';
import { setTheme } from 'ngx-bootstrap/utils';
import { Observable, take, timer } from 'rxjs';
import { iconSubset } from './components/icons/icon-subset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // -----------------------------------------------------
  // PROPERTIES
  // -----------------------------------------------------

  title = 'Application';

  // -----------------------------------------------------
  // SERVICES
  // -----------------------------------------------------

  private titleService: Title = inject<Title>(Title);

  private router: Router = inject<Router>(Router);

  private iconSetService: IconSetService =
    inject<IconSetService>(IconSetService);

  private readonly logger: LoggerService = inject<LoggerService>(LoggerService);

  // -----------------------------------------------------
  // OBSERVABLES
  // -----------------------------------------------------

  @Select(TranslationDataState.getCurrentLanguage)
  public currentLanguage$!: Observable<string>;

  @Select(TranslationDataState.getTextDirection)
  public currentTextDirection$!: Observable<string>;

  @Select(TranslationDataState.getTextDirectionInverted)
  public currentTextDirectionInverted$!: Observable<boolean>;

  @Select(LoadingIndicatorState.isLoading)
  public isLoading$!: Observable<boolean>;

  isLoadingValue = false;

  // -----------------------------------------------------

  constructor() {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };
    setTheme('bs5'); // or 'bs4'
  }

  ngOnInit(): void {
    this.logger.console.debug('AppComponent', 'onInit');

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.currentTextDirection$.subscribe((dir: string) => {
      const html = document.getElementsByTagName('html')[0] as HTMLElement;
      html.dir = dir;
    });

    this.currentLanguage$.subscribe((lang: string) => {
      const html = document.getElementsByTagName('html')[0] as HTMLElement;
      html.lang = lang;
    });

    this.isLoading$.subscribe((value: boolean) => {
      timer(0)
        .pipe(take(1))
        .subscribe(() => {
          this.isLoadingValue = value;
        });
    });

    /*
   let sub: Subscription | null = null;

   const observer = ElementsResizeObserver.getElementsResizeObserver('div', true);

    setTimeout(()=>{
      Logger.log(this.__classname, "ElementsResizeObserver -> subscribe")
      sub = observer.subscribe((data) => {
        Logger.table('getBodyResizeObserver Data 1', data);
      });

    }, 10000);

    setTimeout(()=>{
      Logger.log(this.__classname, "ElementsResizeObserver -> unsubscribe")
      sub?.unsubscribe();

    }, 20000);
    */
  }
}
