import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilCryptoManagerModule } from '@app/util/crypto/manager';
import { UtilStoreLocalStoreEngineManagerService } from './service/util-storage-local-manager.service';

@NgModule({
  imports: [CommonModule, UtilCryptoManagerModule],
  providers: [UtilStoreLocalStoreEngineManagerService],
})
export class UtilStorageLocalModule {}
