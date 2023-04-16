import { Component, inject, OnInit } from '@angular/core';

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

    this.currentTextDirection$.subscribe((dir: string) => {
      const html = document.getElementsByTagName('html')[0] as HTMLElement;
      html.dir = dir;
    });

    this.currentLanguage$.subscribe((lang: string) => {
      const html = document.getElementsByTagName('html')[0] as HTMLElement;
      html.lang = lang;
    });

    this.isLoading$.subscribe((loading: boolean) => {
      timer(loading ? 0 : 300)
        .pipe(take(1))
        .subscribe(() => {
          this.isLoadingValue = loading;
        });
    });
  }
}
