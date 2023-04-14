/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class AbstractDataState {

    static getStoredDefaultsValue(): any {
        throw new Error('Method must be overrided!!!');
    }

    static getStoredKeys(prefix: string = ''): string[]{
        throw new Error('Method must be overrided!!!');
    }

}