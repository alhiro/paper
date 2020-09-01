import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  show: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  toggleSideMenu() {
    this.show = !this.show;
    let body = document.getElementsByTagName('body')[0];
    if (this.show) {
      body.classList.add('sidebar-close');
    } else {
      body.classList.remove('sidebar-close');
    }
  }

  gotoHome() {
    this.router.navigate(['/home'], { skipLocationChange: true }).then(() => {
      window.location.href = window.location.protocol + '//' + window.location.host + '/home';
    });
  }
}
