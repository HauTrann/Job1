import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AuthenticationService, UserService} from "../../../_services";
import {User} from "../../../_models";
import {Router} from "@angular/router";

@Component(
  {
    selector: 'app-admin-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['./layout.component.css']
  }
)
export class LayoutComponent implements OnInit {
  loading = false;
  currentUser: User;
  users: User[];
  active:boolean;

  constructor(private userService: UserService,
              public router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loading = true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['admin/login']);
  }

  activeLink() {
    this.active = !this.active;
  }

}
