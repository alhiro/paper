import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/auth';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// get account
export interface Get {
  // user for get response
  data: any;

  // use for filter
  name: string;
  type: string;
  description: string;
  sort_field: number;
  sort_type: number;
  page: number;
  per_page: number;
}

// create or update account
export interface modelAccount {
  name: string;
  type: string;
  description: string;
}

// delete account
export interface DeleteAccount {
  id: any;
}

const routes = {
  getAcc: (c: Get) => `/api/v1/finance-accounts?name=${c.name}&description=${c.description}&type=${c.type}&sort_field=${c.sort_field}&sort_type=${c.sort_type}&page=${c.page}&per_page=${c.per_page}`,
  deleteAcc: (c: DeleteAccount) => `/api/v1/finance-accounts/${c.id}`,
};

@Injectable({
  providedIn: 'root',
})
export class ListProductService {
  constructor(private service: AuthenticationService) {}

  getAccount(context: Get): Observable<any> {
    return this.service.authGet(routes.getAcc(context));
  }
}
