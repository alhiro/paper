import { createDefaultLoadable, Loadable } from '../loadable/loadable';
import { DetailActionsUnion, DetailActionsTypes } from '../actions/detail.action';
import { withLoadable } from '../loadable/with-loadable';

export interface Detail extends Loadable {
  data: string[];
}

export function createDefaultDetail(): Detail {
  return {
    ...createDefaultLoadable(),
    data: [],
  };
}

function baseDetailReducer(state: Detail = createDefaultDetail(), action: DetailActionsUnion): Detail {
  switch (action.type) {
    case DetailActionsTypes.LoadSuccess:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

export function detailReducer(state: Detail, action: DetailActionsUnion): Detail {
  return withLoadable(baseDetailReducer, {
    loadingActionType: DetailActionsTypes.Load,
    successActionType: DetailActionsTypes.LoadSuccess,
    errorActionType: DetailActionsTypes.LoadError,
  })(state, action);
}
