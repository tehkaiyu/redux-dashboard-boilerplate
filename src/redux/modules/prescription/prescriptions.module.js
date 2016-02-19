/**
 * Prescriptions module - handles multiple prescriptions store
 */
import { RESET_CACHE } from '../auth/auth.constants.js';
import { ADD_PRESCRIPTION_SUCCESS } from './prescription.module.js';
import {
  PRESCRIPTIONS_ENDPOINT, PRESCRIPTION_GROUPS, attachPrescriptionUiInfo, groupPrescriptions
} from './prescriptions.helper.js';

export const GET_PRESCRIPTIONS = 'GET_PRESCRIPTIONS';
export const GET_PRESCRIPTIONS_SUCCESS = 'GET_PRESCRIPTIONS_SUCCESS';
export const GET_PRESCRIPTIONS_FAIL = 'GET_PRESCRIPTIONS_FAIL';

// Action Creators
export function isLoaded(globalState) {
  return globalState.prescriptions && globalState.prescriptions.loaded;
}

export function fetchAll() {
  return {
    types: [
      GET_PRESCRIPTIONS,
      GET_PRESCRIPTIONS_SUCCESS,
      GET_PRESCRIPTIONS_FAIL
    ],
    promise: (client) => client.get(PRESCRIPTIONS_ENDPOINT)
  };
}

// Reducer
const initialState = {
  ...PRESCRIPTION_GROUPS,
  loading: false,
  loaded: false
};

const reducerMap = {
  [GET_PRESCRIPTIONS]: (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  },
  [GET_PRESCRIPTIONS_SUCCESS]: (state, action) => {
    const prescriptions = action.result;
    const groupedPrescriptions = groupPrescriptions(
      prescriptions.map(attachPrescriptionUiInfo)
    );

    return {
      ...state,
      ...groupedPrescriptions,
      loading: false,
      loaded: true
    };
  },
  [GET_PRESCRIPTIONS_FAIL]: () => initialState,

  [ADD_PRESCRIPTION_SUCCESS]: (state, action) => {
    const prescription = attachPrescriptionUiInfo(action.result[0]);
    const unscheduled = [
      ...state.unscheduled,
      prescription
    ];

    return {
      ...state,
      unscheduled
    };
  },

  [RESET_CACHE]: () => initialState
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
