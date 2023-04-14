import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('SUITECRM7_V8_API_BASE_PATH');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
