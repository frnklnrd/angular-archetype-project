export * from './auth.service';
import { AuthService } from './auth.service';
export * from './categories.service';
import { CategoriesService } from './categories.service';
export * from './menus.service';
import { MenusService } from './menus.service';
export * from './pages.service';
import { PagesService } from './pages.service';
export * from './posts.service';
import { PostsService } from './posts.service';
export * from './roles.service';
import { RolesService } from './roles.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [AuthService, CategoriesService, MenusService, PagesService, PostsService, RolesService, UsersService];