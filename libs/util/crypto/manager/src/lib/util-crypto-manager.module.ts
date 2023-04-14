import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilCryptoManagerService } from './service/util-crypto-manager.service';

@NgModule({
  imports: [CommonModule],
  providers: [UtilCryptoManagerService],
})
export class UtilCryptoManagerModule {}
