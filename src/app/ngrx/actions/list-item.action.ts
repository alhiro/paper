import { Action } from '@ngrx/store';

export enum ListsActionsTypes {
  Load = '[POKEMON] LOAD',
  LoadSuccess = '[POKEMON] LOAD SUCCESS',
  LoadError = '[POKEMON] LOAD ERROR',
}

export class LoadLists implements Action {
  readonly type = ListsActionsTypes.Load;
  constructor(public input: any) {}
}

export class LoadListsSuccess implements Action {
  readonly type = ListsActionsTypes.LoadSuccess;
  constructor(public payload: { data: string[] }) {}
}

export class LoadListsError implements Action {
  readonly type = ListsActionsTypes.LoadError;
  constructor(public error: any) {}
}

export type ListActionsUnion = LoadLists | LoadListsSuccess | LoadListsError;
