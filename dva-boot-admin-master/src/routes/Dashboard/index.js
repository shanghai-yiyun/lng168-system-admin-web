import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/dashboard',
  title: '主菜单',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
