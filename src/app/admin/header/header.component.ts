import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuHidden = true;

  show: boolean = false;
  loggedIn: boolean = false;

  @ViewChild('alert') private alertElement: ElementRef;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  get email(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.name : null;
  }

  ngOnInit() {
    this.isloged();
  }

  ngOnDestroy() {}

  isloged() {
    const logged = this.credentialsService.getCredentials();
    if (logged === null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  cart() {
    // cart function
  }

  search() {
    // search function
  }

  closeAlert() {
    this.alertElement.nativeElement.remove();
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  toggleSideMenu() {
    this.show = !this.show;
    let body = document.getElementsByTagName('body')[0];
    if (this.show) {
      body.classList.add('sidebar-close');
    } else {
      body.classList.remove('sidebar-close');
    }
  }
}
