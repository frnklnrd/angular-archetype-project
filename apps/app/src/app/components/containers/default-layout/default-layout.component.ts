import { Component } from '@angular/core';
import { take, timer } from 'rxjs';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  public theme = 'light'; // dark

  public loading = true;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
    timer(1500)
      .pipe(take(1))
      .subscribe((val) => {
        this.loading = false;
      });
  }
}
