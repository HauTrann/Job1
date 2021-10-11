import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AuthenticationService, UserService} from "../../../_services";
import {User} from "../../../_models";
import {Router} from "@angular/router";
import {ContractMe, NetWork} from "../../../_models/common.model";
import {getPagesize, listRecordPaging} from 'src/app/store/UtilsValue';
import {HomeService} from "../../../_services/home.service";

@Component(
  {
    selector: 'app-admin-mail',
    templateUrl: 'mail.component.html',
    styleUrls: ['./mail.component.css']
  }
)
export class MailComponent implements OnInit {
  loading = false;
  currentUser: User;
  contractMes: ContractMe[];

  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;
  listRecordPaging = listRecordPaging;
  msizepage: number;
  searchText:string;

  constructor(private userService: UserService,
              private router: Router,
              private homeService: HomeService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loading = true;
    this.loading = false;
    this.msizepage = getPagesize();
    this.onPageChange(1);
  }

  getContracMes(){
    this.homeService.getContracMes(this.pageNumber, this.pageSize, this.searchText).subscribe((res: any) => {
      this.contractMes = res.body.content;
      this.totalRecords = res.body.totalElements;
    });
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.getContracMes();
  }

  onPageChange(pageNum: number) {
    this.pageNumber = pageNum;
    this.getContracMes();
  }

}
