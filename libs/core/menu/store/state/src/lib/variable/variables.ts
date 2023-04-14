import { MenuModel } from '@app/core/menu/store/model';
import { StateToken } from '@ngxs/store';

export const MENU_STATE_TOKEN = new StateToken<MenuModel>('menu');
