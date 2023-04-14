import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuDataState } from './state/menu-data.state';

@NgModule({
  imports: [CommonModule],
  providers: [MenuDataState],
})
export class CoreMenuStoreStateModule {}
