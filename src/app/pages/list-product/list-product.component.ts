import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ListProductService } from './list-product.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '@app/@core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';

import { CredentialsService } from '@app/auth';

interface Category {
  name: string;
}

const log = new Logger('Get Account');

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  isLoading: boolean;
  error: string | undefined;

  // use for get response from account
  dataAccount: string | undefined;

  // use for filter data account
  name: string;
  type: string;
  description: string;
  sort_field: string;
  sort_type: string;
  page: number;
  per_page: number;

  addAccount: boolean = false;
  accountForm: FormGroup;

  first = 0;
  rows = 10;

  constructor(
    private service: ListProductService,
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
  ) {
    this.AccForm();
  }

  ngOnInit(): void {
    this.getAccount();
  }

  refreshAccount() {
    this.getAccount();
  }
  
  addFinanceModal() {
    this.addAccount = true;
  }

  closeFinanceModal() {
    this.addAccount = false;
  }

  private AccForm() {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [''],
      description: [''],
    });
  }

  getAccount() {
    this.isLoading = true;
    this.service
      .getAccount({ 
        data: this.dataAccount,
        name: this.name,
        type: this.type,
        description: this.description,
        sort_field: this.sort_field,
        sort_type: this.sort_type,
        page: this.page,
        per_page: this.per_page
      })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          let datas = data;
          this.dataAccount = datas;
          console.log("datas " + JSON.stringify(datas));
        },
        (error) => {
          log.debug(`Get data account error: ${JSON.stringify(error.message)}`);
          this.error = error.message;
        }
      );
  }

  onRowSelect(event: any) {

  }

  createAccount() {
    
  }

  editAccount() {
   
  }

  deleteAccount() {
    
  }
}
