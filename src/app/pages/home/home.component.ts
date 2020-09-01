import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { VendorService } from './vendor.service';
import { Logger } from '@app/@core';
import { DatePipe } from '@angular/common';

const log = new Logger('Show Product');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  error: string | undefined;
  isLoading = false;
  show: boolean = false;

  data: string | undefined;
  vendor: any | undefined;

  filterCategories: any[] | undefined = [];

  pipe = new DatePipe('en-US');
  date: string | undefined;

  constructor(private vendorService: VendorService) {
   
  }

  ngOnInit() {
   
  }
}
