import { Component, Input, OnInit } from '@angular/core';
import { AbstractComponent } from '@app/core/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-navbar-box',
  templateUrl: './navbar-box.component.html',
  styleUrls: ['./navbar-box.component.scss'],
})
export class NavbarBoxComponent
  extends AbstractComponent
  implements OnInit
{
  @Input() customClasses = '';

  private readonly appTextDirectionInverted$!: Observable<boolean>;

  constructor() {
    super();
    // this.appTextDirectionInverted$ = this.ui.translation.getAppTextDirectionInverted$();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  public get isTextDirectionInverted$(): Observable<boolean> {
    return this.appTextDirectionInverted$;
  }
}
