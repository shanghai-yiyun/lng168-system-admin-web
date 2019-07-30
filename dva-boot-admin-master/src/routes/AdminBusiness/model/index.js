import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'adminBusiness',

    state: {
        pageData: PageHelper.create(),
        // rolesMenu: [],
        // rolesSelectMenu: [],
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname}) => {
                if (pathname === '/adminBusiness' && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init'
                    });
                }
            });
        }
    },

    effects: {
        // 保存选择得穿梭树中的菜单
        // * menuSet({payload}, {call, put, select}) {
        //     const {selectMenu, menuRecord, success} = payload;
        //     yield put({
        //         type: '@request',
        //         payload: {
        //             notice: true,
        //             url: '/adminBusiness/menuSet',
        //             data: {
        //                 roleId: menuRecord.id,
        //                 roleName: menuRecord.name,
        //                 children: selectMenu,
        //             }
        //         }
        //     });
        //     success();
        // },
        // 进入页面加载
        * init({payload}, {call, put, select}) {
            const {pageData} = yield select(state => state.adminBusiness);
            yield put({
                type: 'getPageInfo',
                payload: {
                    pageData: pageData.startPage(1, 10)
                }
            });
            // yield put({
            //     type: 'getRolesMenu'
            // });
        },
        // 获取分页数据
        * getPageInfo({payload}, {call, put}) {
            const {pageData} = payload;
            yield put({
                type: '@request',
                payload: {
                    valueField: 'pageData',
                    url: '/adminBusiness/getList',
                    pageInfo: pageData
                }
            });
        },
        // 保存 之后查询分页
        * save({payload}, {call, put, select, take}) {
            const {values, success, record} = payload;
            const {pageData} = yield select(state => state.adminBusiness);
            if (record === null) {
                yield put({
                    type: '@request',
                    payload: {
                        notice: true,
                        url: '/adminBusiness/add',
                        data: values
                    }
                });
            } else {
                yield put({
                    type: '@request',
                    payload: {
                        notice: true,
                        url: '/adminBusiness/save',
                        data: values
                    }
                });
            }
            // 等待@request结束
            yield take('@request/@@end');
            yield put({
                type: 'getPageInfo',
                payload: {pageData}
            });
            success();
        },
        // 修改
        * update({payload}, {call, put}) {
        },
        // // 获取穿梭树中得数据
        // * getData({payload}, {call, put, select}) {
        //     const {record, success} = payload;
        //     yield put({
        //         type: '@request',
        //         payload: {
        //             valueField: 'rolesSelectMenu',
        //             url: '/adminBusiness/menuGet',
        //             data: record
        //         }
        //     });
        //     success();
        // },
        // 删除 之后查询分页
        * remove({payload}, {call, put, select,take }) {
            const {records, success} = payload;
            const {pageData} = yield select(state => state.adminBusiness);
            yield put({
                type: '@request',
                payload: {
                    notice: true,
                    url: '/adminBusiness/bathDelete',
                    data: records
                }
            });
            // 等待@request结束
            yield take('@request/@@end');
            yield put({
                type: 'getPageInfo',
                payload: {pageData}
            });
            success();
        },
        // // 获取全部菜单列表
        // * getRolesMenu({payload}, {call, put}) {
        //     yield put({
        //         type: '@request',
        //         afterResponse: resp => resp.data,
        //         payload: {
        //             valueField: 'rolesMenu',
        //             url: '/adminBusiness/menuGetAll',
        //         }
        //     });
        // }
    },
    reducers: {}
});
