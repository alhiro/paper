import { createDefaultLoadable, Loadable } from '../loadable/loadable';
import { LoginActionsUnion, LoginActionsTypes } from '../actions/login.action';
import { withLoadable } from '../loadable/with-loadable';

export class User {
  username: string;
  password: string;
}

export interface Login extends Loadable {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

export function createDefaultLogin(): Login {
  return {
    ...createDefaultLoadable(),
    isAuthenticated: false,
    user: null,
    error: null,
  };
}

function baseLoginReducer(state: Login = createDefaultLogin(), action: LoginActionsUnion): Login {
  switch (action.type) {
    case LoginActionsTypes.LoadSuccess:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          username: action.payload.data.email,
          password: action.payload.data.password,
        },
        error: null,
      };
    case LoginActionsTypes.LoadError: {
      return {
        ...state,
        error: 'Incorrect email and/or password.',
      };
    }
    default:
      return state;
  }
}

export function loginReducer(state: Login, action: LoginActionsUnion): Login {
  return withLoadable(baseLoginReducer, {
    loadingActionType: LoginActionsTypes.Load,
    successActionType: LoginActionsTypes.LoadSuccess,
    errorActionType: LoginActionsTypes.LoadError,
  })(state, action);
}
