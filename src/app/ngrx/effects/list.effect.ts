import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { LoadListsError, LoadListsSuccess, ListsActionsTypes, LoadLists } from '../actions/list-item.action';

import { ListService } from '../services/list-item.service';

@Injectable({
  providedIn: 'root',
})
export class ListsEffects {
  constructor(private actions$: Actions, private listService: ListService) {}

  @Effect()
  loadPokemon = this.actions$.pipe(
    ofType(ListsActionsTypes.Load),
    switchMap((action) => {
      const getInput = action as LoadLists;
      console.log('getId ', getInput);

      return this.listService.getList({ input: getInput.input }).pipe(
        map(
          (response: any) =>
            new LoadListsSuccess({
              data: response.cards,
            })
        ),
        catchError((error) => of(new LoadListsError(error)))
      );
    })
  );
}
