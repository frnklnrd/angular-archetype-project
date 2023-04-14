/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { IAppEnvConfig, IAppEnvVarsConfig } from '@app/apps/app/base/api';

import { DotEnvLoaderManagerService } from '@app/util/dotenv/manager';

import { environment } from '../../../environments/environment';

import packageJson from '../../../package.json';

export const APP_ENV_CONFIG: IAppEnvConfig = {
  envName: environment.name === '' ? 'dev' : environment.name,

  production: environment.production,

  appVersion:
    'v' +
    packageJson.version +
    (environment.name === 'prod' ? '' : '-' + environment.name),

  _VARS: DotEnvLoaderManagerService.getVars<IAppEnvVarsConfig>(
    'app',
    environment.name === '' ? 'dev' : environment.name
  ),
};
