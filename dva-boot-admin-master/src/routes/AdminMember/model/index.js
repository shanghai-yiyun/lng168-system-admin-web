import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'adminMember',

    state: {
        pageData: PageHelper.create(),
        memberCertificate: [],
        memberLists: []
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname}) => {
                if (pathname === '/adminMember' && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init'
                    });
                }
            });
        }
    },

    effects: {
        // 进入页面加载
        * init({payload}, {call, put, select}) {
            const {pageData} = yield select(state => state.adminMember);
            yield put({
                type: 'getPageInfo',
                payload: {
                    pageData: pageData.startPage(1, 10)
                }
            });
            yield put({
                type: 'getEnts'
            });
        },
        // 获取分页数据
        * getPageInfo({payload}, {call, put}) {
            const {pageData} = payload;
            yield put({
                type: '@request',
                payload: {
                    valueField: 'pageData',
                    url: '/adminMember/getList',
                    pageInfo: pageData
                }
            });
        },
        // 保存 之后查询分页
        * save({payload}, {call, put, select, take}) {
            const {values, success, record} = payload;
            const {pageData} = yield select(state => state.adminMember);
            if (record === null) {
                yield put({
                    type: '@request',
                    payload: {
                        notice: true,
                        url: '/adminMember/add',
                        data: values
                    }
                });
            } else {
                yield put({
                    type: '@request',
                    payload: {
                        notice: true,
                        url: '/adminMember/save',
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
        // 删除 之后查询分页
        * remove({payload}, {call, put, select,take}) {
            const {records, success} = payload;
            const {pageData} = yield select(state => state.adminMember);
            yield put({
                type: '@request',
                payload: {
                    notice: true,
                    url: '/adminMember/bathDelete',
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
        // 获取导出数据
        * getMemberList({payload}, {call, put, select,take}) {
            const {records,success} = payload;
            yield put({
                type: '@request',
                payload: {
                    valueField: 'memberLists',
                    url: '/adminMember/getMemberList',
                    data: records
                }
            });
            yield take('@request/@@end');
            success();
        },
        // 获取认证信息中的数据中得数据
        * getData({payload}, {call, put, select,take}) {
            const {record, success} = payload;
            yield put({
                type: '@request',
                payload: {
                    valueField: 'memberCertificate',
                    url: '/adminMember/detailInfoGet',
                    data: record
                }
            });
            // 等待@request结束
            yield take('@request/@@end');
            success();
        },
        // 审批客户资质
        * approve({payload}, {call, put, select,take}) {
            const {record, success} = payload;
            const {pageData} = yield select(state => state.adminMember);
            yield put({
                type: '@request',
                payload: {
                    notice: true,
                    url: '/adminMember/approve',
                    data: record
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
        *getEnts({ payload }, { call, put }) {
            yield put({
                type: '@request',
                afterResponse: resp => resp.data,
                payload: {
                    valueField: 'ents',
                    url: '/adminEnterprise/getEnts'
                }
            });
        }
    },

    reducers: {}
});
