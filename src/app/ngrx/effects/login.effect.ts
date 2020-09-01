import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, pipe, throwError } from 'rxjs';
import { LoadLoginError, LoadLoginSuccess, LoginActionsTypes, LoadLogin } from '../actions/login.action';
import { HttpClient } from '@angular/common/http';
import { CredentialsService } from '@app/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginEffects {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actions: Actions,
    private credentialsService: CredentialsService,
    private _http: HttpClient
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */

  @Effect()
  login: Observable<any> = this.actions.pipe(
    ofType(LoginActionsTypes.Load),
    map((action: LoadLogin) => action.payload),
    switchMap((payload) => {
      return this._http
        .post('/api/v1/login', {
          username: payload.email,
          password: payload.password,
        })
        .pipe(
          map((response: any) => {
            console.log('payload ' + JSON.stringify(response));

            const data = {              
              name: payload.email,
              token: response.token,
              last_login: response.last_login,
            };
            this.credentialsService.setCredentials(data, payload.remember);

            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], {
              replaceUrl: true,
            });

            return new LoadLoginSuccess({
              data: response,
            });
          }),
          // catchError(error => of(new LoadLoginError(error)))
          catchError((error) => {
            console.log('error ' + JSON.stringify(error));
            return of({
              type: LoginActionsTypes.LoadError,
              payload: { error },
            });
          })
        );
    })
  );

  handleError(err: any) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // if error is client-side error
      errorMessage = `Error: Can not access server. Check your connection!`;
    } else {
      // if error is server-side error
      errorMessage = `Error Code: ${err}\nMessage: ${err}`;
    }
    return throwError(errorMessage);
  }

  @Effect({ dispatch: false })
  LoadLoginError: Observable<any> = this.actions.pipe(
    ofType(LoginActionsTypes.LoadError),
    map((action: LoadLoginError) => {
      // console.log("action " + JSON.stringify(action.payload))
    })
  );
}
