import { routerRedux } from 'dva/router';
import { login } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {},
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
        }
      });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { status, message, data } = yield call(login, payload);
      if (status === 1) {
        $$.setStore('token', "Bearer " + message);
        $$.setStore('user', data);
        yield put(routerRedux.replace('/'));
      } else {
        yield put({
          type: 'loginError',
          payload: { message }
        });
      }
    },
    *logout(_, { put }) {},
    *loginSMS({ payload }, { call, put }) {
      const { status, message, data } = yield call(getSMS, payload);
      if (status === 1) {
      } else {
        yield put({
          type: 'loginError',
          payload: { message }
        });
      }
    },
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message,

      };
    },
  }
};
