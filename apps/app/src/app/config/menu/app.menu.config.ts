// import { INavDataWithExtraOptions } from '@app/core/menu/api';
import { APP_TRANSLATION_CONFIG } from '../translation/app.translation.config';

/*
export const APP_MENU_SIDEBAR_CONFIG: INavDataWithExtraOptions[] = [
  {
    name: 'Home',
    url: '/p/home',
    iconComponent: { name: 'cil-home' },
    extraOptions: {
      auth: {
        requiredRoles: [
          'IS_ANONYMOUS'
        ],
      },
    },
  },
  {
    name: 'Dashboard',
    url: '/s/dashboard',
    iconComponent: { name: 'cil-bank' },
    extraOptions: {
      auth: {
        requiredRoles: ['IS_AUTHENTICATED'],
      },
    },
  },
  // -----------------------------------------------------
  /*
  {
    title: true,
    name: 'ERRORS',
  },
  {
    name: 'Error 404',
    url: '/404',
    iconComponent: { name: 'cil-bug' },
  },
  {
    name: 'Error 500',
    url: '/500',
    iconComponent: { name: 'cil-layers' },
  },
  // -----------------------------------------------------
  {
    title: true,
    name: 'BOOKS',
    extraOptions: {
      auth: {
        requiredRoles: ['ROLE_USER'],
      },
    },
  },
  {
    name: 'Books entries',
    url: '/demo/books/list',
    iconComponent: { name: 'cil-book' },
    extraOptions: {
      auth: {
        requiredRoles: ['ROLE_USER'],
      },
    },
  },
  // -----------------------------------------------------
  {
    title: true,
    name: 'NATIVE',
    extraOptions: {
      auth: {
        requiredRoles: [],
      },
    },
  },
  {
    name: 'Device',
    url: '/demo/native/device',
    iconComponent: { name: 'cil-mobile' },
    extraOptions: {
      auth: {
        requiredRoles: [],
      },
    },
  },
  {
    name: 'Camera',
    url: '/demo/native/camera',
    iconComponent: { name: 'cil-camera' },
    extraOptions: {
      auth: {
        requiredRoles: [],
      },
    },
  },
  {
    name: 'Barcode',
    url: '/demo/native/barcode',
    iconComponent: { name: 'cil-barcode' },
    extraOptions: {
      auth: {
        requiredRoles: [],
      },
    },
  },
  {
    name: 'Qr',
    url: '/demo/native/qrcode',
    iconComponent: { name: 'cil-qr-code' },
    extraOptions: {
      auth: {
        requiredRoles: [],
      },
    },
  },
  // -----------------------------------------------------
  {
    title: true,
    name: 'WIDGETS',
    extraOptions: {
      auth: {
        requiredRoles: [],
      },
    },
  },
  {
    name: 'Modal',
    url: '/demo/widget/modal',
    iconComponent: { name: 'cil-window-maximize' },
    extraOptions: {
      auth: {
        requiredRoles: [],
      },
    },
  },
  {
    name: 'Toast',
    url: '/demo/widget/toast',
    iconComponent: { name: 'cil-comment-square' },
    extraOptions: {
      auth: {
        requiredRoles: [],
      },
    },
  },
  // -----------------------------------------------------
  /*
  {
    title: true,
    name: 'OTHER',
    extraOptions: {
      auth: {
        anonymous: false,
        restricted: true,
        requiredRolesOperator: 'or',
        requiredRoles: ['ROLE_ADMIN', 'ROLE_CUSTOMER'],
      },
    },
  },
  {
    name: 'Other 1 - user',
    url: '/s/other1',
    iconComponent: { name: 'cil-bank' },
    extraOptions: {
      auth: {
        anonymous: false,
        restricted: true,
        requiredRoles: ['ROLE_USER'],
      },
    },
  },
  {
    name: 'Other 2 - admin',
    url: '/s/other2',
    iconComponent: { name: 'cil-bank' },
    extraOptions: {
      auth: {
        anonymous: false,
        restricted: true,
        requiredRoles: ['ROLE_ADMIN'],
      },
    },
  },
  {
    name: 'Other 3 - admin and customer',
    url: '/s/other3',
    iconComponent: { name: 'cil-bank' },
    extraOptions: {
      auth: {
        anonymous: false,
        restricted: true,
        requiredRolesOperator: 'and',
        requiredRoles: ['ROLE_ADMIN', 'ROLE_CUSTOMER'],
      },
    },
  },
  {
    name: 'Other 4 - user or customer',
    url: '/s/other4',
    iconComponent: { name: 'cil-bank' },
    extraOptions: {
      auth: {
        anonymous: false,
        restricted: true,
        requiredRolesOperator: 'or',
        requiredRoles: ['ROLE_USER', 'ROLE_CUSTOMER'],
      },
    },
  },
  {
    name: 'Other 5 - admin or customer',
    url: '/s/other5',
    iconComponent: { name: 'cil-bank' },
    extraOptions: {
      auth: {
        anonymous: false,
        restricted: true,
        requiredRolesOperator: 'or',
        requiredRoles: ['ROLE_ADMIN', 'ROLE_CUSTOMER'],
      },
    },
  },
  */
// -----------------------------------------------------
/*
  {
    title: true,
    name: 'COREUI VIEWS',
  },
  {
    name: 'Dashboard',
    url: '/demo/coreui/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Theme',
  },
  {
    name: 'Colors',
    url: '/demo/coreui/theme/colors',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Typography',
    url: '/demo/coreui/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' },
  },
  {
    name: 'Components',
    title: true,
  },
  {
    name: 'Base',
    url: '/demo/coreui/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/demo/coreui/base/accordion',
      },
      {
        name: 'Breadcrumbs',
        url: '/demo/coreui/base/breadcrumbs',
      },
      {
        name: 'Cards',
        url: '/demo/coreui/base/cards',
      },
      {
        name: 'Carousel',
        url: '/demo/coreui/base/carousel',
      },
      {
        name: 'Collapse',
        url: '/demo/coreui/base/collapse',
      },
      {
        name: 'List Group',
        url: '/demo/coreui/base/list-group',
      },
      {
        name: 'Navs & Tabs',
        url: '/demo/coreui/base/navs',
      },
      {
        name: 'Pagination',
        url: '/demo/coreui/base/pagination',
      },
      {
        name: 'Placeholder',
        url: '/demo/coreui/base/placeholder',
      },
      {
        name: 'Popovers',
        url: '/demo/coreui/base/popovers',
      },
      {
        name: 'Progress',
        url: '/demo/coreui/base/progress',
      },
      {
        name: 'Spinners',
        url: '/demo/coreui/base/spinners',
      },
      {
        name: 'Tables',
        url: '/demo/coreui/base/tables',
      },
      {
        name: 'Tabs',
        url: '/demo/coreui/base/tabs',
      },
      {
        name: 'Tooltips',
        url: '/demo/coreui/base/tooltips',
      },
    ],
  },
  {
    name: 'Buttons',
    url: '/demo/coreui/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/demo/coreui/buttons/buttons',
      },
      {
        name: 'Button groups',
        url: '/demo/coreui/buttons/button-groups',
      },
      {
        name: 'Dropdowns',
        url: '/demo/coreui/buttons/dropdowns',
      },
    ],
  },
  {
    name: 'Forms',
    url: '/demo/coreui/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/demo/coreui/forms/form-control',
      },
      {
        name: 'Select',
        url: '/forms/select',
      },
      {
        name: 'Checks & Radios',
        url: '/demo/coreui/forms/checks-radios',
      },
      {
        name: 'Range',
        url: '/demo/coreui/forms/range',
      },
      {
        name: 'Input Group',
        url: '/demo/coreui/forms/input-group',
      },
      {
        name: 'Floating Labels',
        url: '/demo/coreui/forms/floating-labels',
      },
      {
        name: 'Layout',
        url: '/demo/coreui/forms/layout',
      },
      {
        name: 'Validation',
        url: '/demo/coreui/forms/validation',
      },
    ],
  },
  {
    name: 'Charts',
    url: '/demo/coreui/charts',
    iconComponent: { name: 'cil-chart-pie' },
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/demo/coreui/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/demo/coreui/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE',
        },
      },
      {
        name: 'CoreUI Flags',
        url: '/demo/coreui/icons/flags',
      },
      {
        name: 'CoreUI Brands',
        url: '/demo/coreui/icons/brands',
      },
    ],
  },
  {
    name: 'Notifications',
    url: '/demo/coreui/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/demo/coreui/notifications/alerts',
      },
      {
        name: 'Badges',
        url: '/demo/coreui/notifications/badges',
      },
      {
        name: 'Modal',
        url: '/demo/coreui/notifications/modal',
      },
      {
        name: 'Toast',
        url: '/demo/coreui/notifications/toasts',
      },
    ],
  },
  {
    name: 'Widgets',
    url: '/demo/coreui/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/demo/coreui/pages/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/demo/coreui/pages/login',
      },
      {
        name: 'Register',
        url: '/demo/coreui/pages/register',
      },
      {
        name: 'Error 404',
        url: '/demo/coreui/pages/404',
      },
      {
        name: 'Error 500',
        url: '/demo/coreui/pages/500',
      },
    ],
  },
  // -----------------------------------------------------
];
*/

export const APP_MENU_CONFIG = {
  sidebar: {
    main: [], //  APP_MENU_SIDEBAR_CONFIG,
  },
  lang: {
    available: APP_TRANSLATION_CONFIG.languages,
  },
};
