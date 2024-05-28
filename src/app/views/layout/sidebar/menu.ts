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
    label: 'Categories',
    icon: 'sidebar',
    subItems: [
      {
        label: 'List categories',
        link: '/category/list',
      },
      {
        label: 'Create category',
        link: '/category/create',
      }
    ]
  },
  {
    label: 'Posts',
    icon: 'file-text',
    subItems: [
      {
        label: 'List posts',
        link: '/post/list',
      },
      {
        label: 'Create post',
        link: '/post/create',
      }
    ]
  },
  // {
  //   label: 'Comments',
  //   icon: 'layout',
  //   subItems: [
  //     {
  //       label: 'List comments',
  //       link: '/comment/list',
  //     },
  //     {
  //       label: 'Create comment',
  //       link: '/comment/create',
  //     }
  //   ]
  // },
  {
    label: 'Pages',
    isTitle: true
  },
  {
    label: 'Authentication',
    icon: 'unlock',
    subItems: [
      {
        label: 'Login',
        link: '/auth/login',
      }
    ]
  },
  {
    label: 'Error',
    icon: 'cloud-off',
    subItems: [
      {
        label: '404',
        link: '/error/404',
      },
      {
        label: '500',
        link: '/error/500',
      },
    ]
  },
];
