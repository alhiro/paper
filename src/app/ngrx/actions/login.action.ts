import { Action } from '@ngrx/store';

export enum LoginActionsTypes {
  Load = '[AUTH LOGIN] LOAD',
  LoadSuccess = '[AUTH LOGIN] LOAD SUCCESS',
  LoadError = '[AUTH LOGIN] LOAD ERROR',
}

export class LoadLogin implements Action {
  readonly type = LoginActionsTypes.Load;
  constructor(public payload: any) {}
}

export class LoadLoginSuccess implements Action {
  readonly type = LoginActionsTypes.LoadSuccess;
  constructor(public payload: { data: any }) {}
}

export class LoadLoginError implements Action {
  readonly type = LoginActionsTypes.LoadError;
  constructor(public payload: any) {}
}

export type LoginActionsUnion = LoadLogin | LoadLoginSuccess | LoadLoginError;
