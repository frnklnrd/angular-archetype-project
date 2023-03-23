import packageJson from '../../package.json';
import { environment } from '../../environments/environment';
const { version } = packageJson;
export const appVersion =
  version + (environment.name === 'prod' ? '' : '-' + environment.name);
