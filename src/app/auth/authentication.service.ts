import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private _http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */

  login(context: LoginContext): Observable<any> {
    return this._http
      .post('/auth/signin', {
        email: context.email,
        password: context.password,
      })
      .pipe(
        map((response) => {
          const result = response as any;
          const data = {
            email: context.email,
            token: result.token,
          };
          this.credentialsService.setCredentials(data, context.remember);
          //console.log('result', result);
          return of(result);
        }),
        catchError(this.handleError)
      );
  }

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

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  /**
   * Provides a base for get token that used header CRUD.
   */
  private initAuthHeaders(): HttpHeaders {
    const token = this.credentialsService.getCredentials();
    if (token === null) {
      this.logout();
    }

    const getToken = token.token;

    if (getToken === null) {
      this.logout();
    }
    // const headers = new HttpHeaders(
    //   {
    //     'Authorization': 'Bearer ' + getToken,
    //     'Access-Contorl-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    //   }
    // );

    const headers: HttpHeaders = new HttpHeaders({ 'x-access-token': getToken });
    // set('Access-Control-Allow-Origin', '* ').
    // set('Content-Type', 'application/json').
    // set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    return headers;
  }

  /**
   * Provides a base for CRUD.
   */
  authGet(url: string) {
    const headers = this.initAuthHeaders();
    return this._http.get(url, { headers }).pipe(map((response) => response));
  }

  authPost(url: string, body: any): any {
    const headers = this.initAuthHeaders();
    return this._http.post(url, body, { headers }).pipe(map((response) => response));
  }

  authPut(url: string, body: any): any {
    const headers = this.initAuthHeaders();
    return this._http.put(url, body, { headers }).pipe(map((response) => response));
  }

  authPatch(url: string, body: any): any {
    const headers = this.initAuthHeaders();
    return this._http.patch(url, body, { headers }).pipe(map((response) => response));
  }

  authDelete(url: string): any {
    const headers = this.initAuthHeaders();
    return this._http.delete(url, { headers }).pipe(map((response) => response));
  }
}
