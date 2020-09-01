import { Action } from '@ngrx/store';

export enum DetailActionsTypes {
  Load = '[DETAIL] LOAD',
  LoadSuccess = '[DETAIL] LOAD SUCCESS',
  LoadError = '[DETAIL] LOAD ERROR',
}

export class LoadDetail implements Action {
  readonly type = DetailActionsTypes.Load;
  constructor(public id: any) {}
}

export class LoadDetailSuccess implements Action {
  readonly type = DetailActionsTypes.LoadSuccess;
  constructor(public payload: { data: string[] }) {}
}

export class LoadDetailError implements Action {
  readonly type = DetailActionsTypes.LoadError;
  constructor(public error: any) {}
}

export type DetailActionsUnion = LoadDetail | LoadDetailSuccess | LoadDetailError;
