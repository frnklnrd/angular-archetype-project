import { InjectionToken } from '@angular/core';

export const UTIL_STORE_LOCAL_STORAGE_PREFIX_KEY =
  new InjectionToken<string>('UTIL_STORE_LOCAL_STORAGE_PREFIX_KEY');

  export const UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_KEYS =
  new InjectionToken<boolean>('UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_KEYS');

  export const UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_VALUES =
  new InjectionToken<boolean>('UTIL_STORE_LOCAL_STORAGE_USE_CRYPTO_FOR_VALUES');
