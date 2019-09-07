import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/sign/appDownLoad',
  title: 'App下载页',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
