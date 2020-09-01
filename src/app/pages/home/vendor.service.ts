import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '@app/auth';
import { map, catchError } from 'rxjs/operators';

const routes = {
  ReadVendor: (c: Read) => `/users/all`,

  CategoryVendor: (c: Read) => `/users/categories`,
  SearchVendor: (c: Read) => `/users/search/${c.data}`,
};

export interface Read {
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private httpClient: HttpClient, private service: AuthenticationService) {}

  Read(context: Read): Observable<any> {
    return this.httpClient.get(routes.ReadVendor(context));
  }

  Categories(context: Read): Observable<any> {
    return this.service.authGet(routes.CategoryVendor(context));
  }

  FindVendor(context: Read): Observable<any> {
    return this.httpClient.get(routes.SearchVendor(context));
  }
}
