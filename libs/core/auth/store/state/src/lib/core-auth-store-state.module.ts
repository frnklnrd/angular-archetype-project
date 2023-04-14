import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDataState } from './state/auth-data.state';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthDataState
  ],
})
export class CoreAuthStoreStateModule {}
