/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { UtilCryptoManagerService } from '@app/util/crypto/manager';
import { StorageEngine } from '@ngxs/storage-plugin';
import {
  UTIL_STORE_LOCAL_STORAGE_PREFIX_KEY,
  UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_KEYS,
  UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_VALUES,
} from '../variable/variables';

@Injectable()
export class UtilStoreLocalStoreEngineManagerService implements StorageEngine {
  private prefixKey: string = inject<string>(
    UTIL_STORE_LOCAL_STORAGE_PREFIX_KEY
  );

  private useCryptoForKeys: boolean = inject<boolean>(
    UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_KEYS
  );

  private useCryptoForValues: boolean = inject<boolean>(
    UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_VALUES
  );

  private crypto: UtilCryptoManagerService = inject<UtilCryptoManagerService>(
    UtilCryptoManagerService
  );

  // --------------------------------------------------------------

  private getPrefixKey(): string {
    return this.prefixKey ? this.prefixKey.toUpperCase() : 'APP';
  }

  private getUseCryptoForKeys(): boolean {
    return !!this.useCryptoForKeys;
  }

  private getUseCryptoForValues(): boolean {
    return !!this.useCryptoForValues;
  }

  // --------------------------------------------------------------

  protected getStorage(): Storage {
    return localStorage;
  }

  protected getFullKey(key: string): string {
    const fullKey =
      this.getPrefixKey() +
      ':[' +
      (this.getUseCryptoForKeys() ? this.crypto.md5(key) : key) +
      ']';
    return fullKey;
  }

  protected getEncryptedData(str: string): any {
    if (!this.getUseCryptoForValues()) {
      return str;
    }
    const stringifiedData = JSON.stringify({ val: str });
    return this.crypto.encrypt(stringifiedData);
  }

  protected getDecryptedData(str: string): string {
    if (!this.getUseCryptoForValues()) {
      return str;
    }
    const decodedData = this.crypto.decrypt(str);
    const parsedData = JSON.parse(decodedData);
    return parsedData?.val !== undefined ? parsedData.val : null;
  }

  // ----------------------------------

  get length(): number {
    return this.getStorage().length;
  }

  setItem(key: string, val: any): void {
    const fullKey = this.getFullKey(key);
    const encoded = this.getEncryptedData(val);
    this.getStorage().setItem(fullKey, encoded);
  }

  getItem(key: string): any {
    const fullKey = this.getFullKey(key);
    const encoded = this.getStorage().getItem(fullKey);
    if (encoded) {
      try {
        const decodedData = this.getDecryptedData(encoded);
        return decodedData;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  removeItem(key: string): void {
    const fullKey = this.getFullKey(key);
    this.getStorage().removeItem(fullKey);
  }

  clear(): void {
    this.getStorage().clear();
  }

  key(val: number): string | null {
    return this.getStorage().key(val);
  }
}
