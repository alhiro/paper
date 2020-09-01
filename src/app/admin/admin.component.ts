import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private credentialsService: CredentialsService) {}

  ngOnInit() {
    this.isLogin();
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
}
