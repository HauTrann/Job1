import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AuthenticationService, UserService} from "../../../_services";
import {User} from "../../../_models";
import {Router} from "@angular/router";

@Component(
  {
    selector: 'app-admin-home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
  }
)
export class HomeComponent implements OnInit {
  loading = false;
  currentUser: User;
  users: User[];

  constructor(private userService: UserService,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loading = true;
    this.loading = false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
