import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { LoadDetailError, LoadDetailSuccess, DetailActionsTypes, LoadDetail } from '../actions/detail.action';

import { ListService } from '../services/list-item.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DetailEffects {
  constructor(private routeActive: ActivatedRoute, private actions$: Actions, private listService: ListService) {}

  @Effect()
  loadDetail = this.actions$.pipe(
    ofType(DetailActionsTypes.Load),
    switchMap((action) => {
      const getId = action as LoadDetail;
      console.log('getId ', getId);

      return this.listService.getDetail({ id: getId.id }).pipe(
        map(
          (response: any) =>
            new LoadDetailSuccess({
              data: response.cards,
            })
        ),
        catchError((error) => of(new LoadDetailError(error)))
      );
    })
  );
}
