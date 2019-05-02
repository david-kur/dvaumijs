import { create, update, fetch, remove } from '../services/customers';

export default {
  namespace: 'customers',
  state: {
    list: [],
    total: null,
    page: 1,
  },
  reducers: {
    getList(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, total } = yield call(fetch, { page });
      yield put({ type: 'getList', payload: { data, total, page: parseInt(page, 10) } });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.customers.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(remove, id);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(create, values);
      yield put({ type: 'reload' });
    },
    *update({ payload: { id, values } }, { call, put }) {
      yield call(update, id, values);
      yield put({ type: 'reload' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/customers') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
