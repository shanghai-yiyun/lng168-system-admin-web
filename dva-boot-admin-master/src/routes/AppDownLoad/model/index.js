import modelEnhance from '@/utils/modelEnhance';
import { normal } from 'components/Notification';

let LOADED = false;
const notice = normal;
export default modelEnhance({
  namespace: 'appDownLoad',

  state: {
    appIOS: {},
    appAndroid: {},
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname === '/sign/appDownLoad' && !LOADED) {
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
      yield put({
        type: 'getIOSVersions'
      });
      yield put({
        type: 'getAndroidVersions'
      });
    },
    *getIOSVersions({ payload }, { call, put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'appIOS',
          url: '/no-auth/adminSoftVersion/getIOS'
        }
      });
    },
    *getAndroidVersions({ payload }, { call, put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'appAndroid',
          url: '/no-auth/adminSoftVersion/getAndroid'
        }
      });
    },
  },
  reducers: {}
});
