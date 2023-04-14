/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { AbstractComponent } from '@app/core/api';
import { FlowStatusModel } from '@app/core/flow/store/model';
import { FlowDataState } from '@app/core/flow/store/state';
import { MenuDataState } from '@app/core/menu/store/state';
import { TranslationManagerService } from '@app/core/translation/manager';
import { TranslationDataState } from '@app/core/translation/store/state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-language-chooser',
  templateUrl: './menu-language-chooser.component.html',
  styleUrls: ['./menu-language-chooser.component.scss'],
})
export class MenuLanguageChooserComponent
  extends AbstractComponent
  implements OnInit
{
  // -----------------------------------------------------
  // SERVICES
  // -----------------------------------------------------

  protected translation: TranslationManagerService =
    inject<TranslationManagerService>(TranslationManagerService);

  // -----------------------------------------------------
  // OBSERVABLES
  // -----------------------------------------------------

  @Select(MenuDataState.getMenuItemsSelector('languages-chooser-options'))
  public languagesChooserOptions$!: Observable<any[]>;

  @Select(TranslationDataState.getCurrentLanguage)
  public currentLanguage$!: Observable<string>;

  @Select(FlowDataState.getStatus)
  public currentFlowStatus$!: Observable<FlowStatusModel>;

  // -----------------------------------------------------

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  changeCurrentLang(lang: string): void {
    this.translation.use(lang);
  }
}
