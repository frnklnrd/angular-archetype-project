import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreAuthManagerDefaultModule } from '@app/core/auth/manager/default';
import { DefaultAuthPermissionGuard } from './guard/default-auth-permission.guard';

@NgModule({
  imports: [CommonModule, CoreAuthManagerDefaultModule],
  providers: [DefaultAuthPermissionGuard],
})
export class CoreAuthGuardDefaultModule {}
