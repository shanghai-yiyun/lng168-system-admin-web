import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { viewContract } from '../service';
import {login} from "../../Login/service";

/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'adminMyOrder',

    state: {
        pageData: PageHelper.create(),
        viewContractUrl:""
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname}) => {
                if (pathname === '/adminMyOrder' && !LOADED) {
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
            const {pageData} = yield select(state => state.adminMyOrder);
            yield put({
                type: 'getPageInfo',
                payload: {
                    pageData: pageData.startPage(1, 10)
                }
            });
        },
        // 获取分页数据
        * getPageInfo({payload}, {call, put}) {
            const {pageData} = payload;
            yield put({
                type: '@request',
                payload: {
                    valueField: 'pageData',
                    url: '/adminOrder/getList',
                    pageInfo: pageData
                }
            });
        },
        // 查看合同
        * viewContract({payload}, {call, put, select,take}) {
            const { status, message, data } = yield call(viewContract, payload);
            const w = window.open('about:blank');
            // 要打开的新页面的url
            w.location.href=data.url;
        },

    },

    reducers: {}
});
