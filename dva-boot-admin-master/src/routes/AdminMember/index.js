import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = (app) => ({
    path: '/adminMember',
    title: '会员管理',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);
