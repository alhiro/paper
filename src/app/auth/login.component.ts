import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';

import { AuthenticationService } from './authentication.service';
import { CredentialsService } from './credentials.service';

import { Store } from '@ngrx/store';

import { Login } from '../ngrx/models/login.model';
import { LoadLogin, LoadLoginError, LoadLoginSuccess } from '../ngrx/actions/login.action';
import { Observable } from 'rxjs';

const log = new Logger('Login');

export class User {
  email?: string;
  password?: string;
  token?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  loggedIn = false;

  login$: Observable<Login>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private store: Store<{ login: Login }>
  ) {
    this.createForm();
    this.login$ = this.store.select((state) => state.login);
  }

  ngOnInit() {
    this.logout();
  }

  ngOnDestroy() {}

  onSubmit(): void {
    const action = new LoadLogin(this.loginForm.value);
    this.store.dispatch(action);
  }

  isLogin() {
    const logged = this.credentialsService.getCredentials();

    if (logged) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate([this.route.snapshot.queryParams.redirect || '/login'], { replaceUrl: true });
    }
  }

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          const logged = this.credentialsService.getCredentials();
          log.debug(`${logged.email} successfully logged in`);

          this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
