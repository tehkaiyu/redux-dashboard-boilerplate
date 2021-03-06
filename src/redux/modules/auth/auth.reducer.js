import * as actions from './auth.constants.js';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false
};

const reducerMap = {
  [actions.AUTH]: (state) => {
    return {
      ...state,
      loading: true
    };
  },
  [actions.AUTH_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      token: action.result.token
    };
  },
  [actions.AUTH_FAIL]: (state) => {
    return {
      ...state,
      loading: false,
      token: null
    };
  },

  [actions.LOGIN]: (state) => {
    return {
      ...state,
      loading: true
    };
  },
  [actions.LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      token: action.result.token
    };
  },
  [actions.LOGIN_FAIL]: (state) => {
    return {
      ...state,
      loading: false,
      token: null
    };
  },

  [actions.LOGOUT]: (state) => {
    return {
      ...state,
      loading: true
    };
  },
  [actions.LOGOUT_SUCCESS]: (state) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      token: null
    };
  },
  [actions.LOGOUT_FAIL]: (state) => {
    return {
      ...state,
      loading: false
    };
  }
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
