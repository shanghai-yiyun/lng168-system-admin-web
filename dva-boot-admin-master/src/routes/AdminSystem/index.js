import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = (app) => ({
    path: '/adminSystem',
    title: '系统参数管理',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);
