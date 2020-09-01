import { createDefaultLoadable, Loadable } from '../loadable/loadable';
import { ListActionsUnion, ListsActionsTypes } from '../actions/list-item.action';
import { withLoadable } from '../loadable/with-loadable';

export interface List extends Loadable {
  data: string[];
}

export function createDefaultLists(): List {
  return {
    ...createDefaultLoadable(),
    data: [],
  };
}

function baseListsReducer(state: List = createDefaultLists(), action: ListActionsUnion): List {
  switch (action.type) {
    case ListsActionsTypes.LoadSuccess:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

export function listReducer(state: List, action: ListActionsUnion): List {
  return withLoadable(baseListsReducer, {
    loadingActionType: ListsActionsTypes.Load,
    successActionType: ListsActionsTypes.LoadSuccess,
    errorActionType: ListsActionsTypes.LoadError,
  })(state, action);
}
