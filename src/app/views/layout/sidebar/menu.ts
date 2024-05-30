import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Menu',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Pages',
    isTitle: true
  },
  {
    label: 'Users',
    icon: 'user',
    subItems: [
      {
        label: 'List users',
        link: '/users/list',
      },
      {
        label: 'Create users',
        link: '/users/create',
      }
    ]
  },
  {
    label: 'Products',
    icon: 'sidebar',
    subItems: [
      {
        label: 'List products',
        link: '/products/list',
      },
      {
        label: 'Create product',
        link: '/products/create',
      }
    ]
  },

];
