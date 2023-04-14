import { APP_ENV_CONFIG } from '../_env/app.env.loader';

export const APP_API_CONFIG = {
  book_monkey_v4_api_base_path: APP_ENV_CONFIG._VARS.API_BOOK_MONKEY_BASE_PATH,
  suitecrm7_v8_api_base_path:
    APP_ENV_CONFIG._VARS.API_SUITECRM_BASE_PATH + '/Api/V8',
  laravel9_api_base_path: APP_ENV_CONFIG._VARS.API_LARAVEL_BASE_PATH,
};
