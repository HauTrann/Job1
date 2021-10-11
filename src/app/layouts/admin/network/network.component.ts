import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import {AuthenticationService, UserService} from "../../../_services";
import {User} from "../../../_models";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NetworkService} from "../../../_services/network.service";
import {NetWork, NetWorkMember} from "../../../_models/common.model";
import {getPagesize, listRecordPaging} from 'src/app/store/UtilsValue';

@Component(
  {
    selector: 'app-admin-network',
    templateUrl: 'network.component.html',
    styleUrls: ['./network.component.css']
  }
)
export class NetworkComponent implements OnInit {
  loading = false;
  currentUser: User;
  users: User[];
  formEdit: FormGroup;
  netWorks: NetWork[];

  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;
  listRecordPaging = listRecordPaging;
  msizepage: number;
  searchText: string;
  links: NetWorkMember[];
  linksAddress: NetWorkMember[];

  status: any[];
  statusShow: any[];

  constructor(private userService: UserService,
              public router: Router,
              private modalService: NgbModal,
              public formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private networkService: NetworkService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.status = [
      {
        value: 'A',
        name: 'Active'
      },
      {
        value: 'N',
        name: 'No Active'
      }
    ];

    this.statusShow = [
      {
        value: 'A',
        name: 'Show'
      },
      {
        value: 'N',
        name: 'Hide'
      }
    ];
  }

  ngOnInit() {
    this.loading = true;
    this.innitForm();
    this.getNetworks();
    this.msizepage = getPagesize();
  }


  getNetworks() {
    this.networkService.getAllPage(this.pageNumber, this.pageSize, this.searchText).subscribe((res: any) => {
      this.netWorks = res.body.content;
      this.totalRecords = res.body.totalElements;
    });
  }

  getAllMembers(networkID) {
    this.networkService.getAllMembers(networkID).subscribe((res: any) => {
      this.links = res.body.filter(n => n.TYPE === 1).sort((a, b) => (a.ORDER < b.ORDER ? -1 : 1));
      this.linksAddress = res.body.filter(n => n.TYPE === 2).sort((a, b) => (a.ORDER < b.ORDER ? -1 : 1));
    });
  }

  innitForm(item?) {
    if (item) {
      this.formEdit = this.formBuilder.group({
        ID: [item.ID, [Validators.required]],
        NAME: [item.NAME, [Validators.required]],
        CODE: [item.CODE, [Validators.required]],
        ICON: [item.ICON, [Validators.required]],
        NAMEICON: [item.NAMEICON, [Validators.required]],
        EXPECTEDAPY: [item.EXPECTEDAPY, []],
        COMMISSION: [item.COMMISSION, []],
        TOKENPRICE: [item.TOKENPRICE, []],
        TOTALAMOUNT: [item.TOTALAMOUNT, []],
        STATUS: [item.STATUS, [Validators.required]],
        STATUSNAME: [item.STATUSNAME, []],
        ORDER: [item.ORDER, [Validators.required]],
        BACKGROUND: [item.BACKGROUND ? item.BACKGROUND : '#ffffff', [Validators.required]],
      });
    } else {
      this.formEdit = this.formBuilder.group({
        NAME: ['', [Validators.required]],
        CODE: ['', [Validators.required]],
        ICON: [null, [Validators.required]],
        NAMEICON: ['', [Validators.required]],
        EXPECTEDAPY: ['', []],
        COMMISSION: ['', []],
        TOKENPRICE: ['', []],
        TOTALAMOUNT: ['', []],
        STATUS: ['', [Validators.required]],
        STATUSNAME: ['', []],
        ORDER: [(this.totalRecords ? this.totalRecords : 0) + 1, [Validators.required]],
        BACKGROUND: ['#ffffff', []],
      });
    }
  }

  get f() {
    return this.formEdit?.controls;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  openPopup(detail, item?) {
    this.innitForm(item);
    if (item) {
      this.getAllMembers(item.ID);
    } else {
      this.links = [];
      this.linksAddress = [];
    }
    const modalEditor = this.modalService.open(detail, {size: 'lg', backdrop: 'static'});
  }

  closePoup() {
    this.modalService.dismissAll();
  }

  delete(item) {
    Swal.fire({
      title: 'Confirm',
      html: 'Delete ' + item.NAME,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
        this.networkService.delete({ID: item.ID}).subscribe((res: any) => {
          if (res.body.status) {
            this.toastrService.success('Successfully deleted\n');
            this.getNetworks();
          }
        });
      }
    });
  }

  submitForm() {
    if (this.formEdit.invalid) {
      this.toastrService.warning('The required information has not been entered');
      return;
    }
    const body = this.formEdit.getRawValue();
    body.members = new Array<NetWorkMember>();
    if (this.links && this.links.length > 0) {
      body.members.push(...this.links);
    }
    if (this.linksAddress && this.linksAddress.length > 0) {
      body.members.push(...this.linksAddress);
    }
    if (body.ID) {
      this.networkService.update(body).subscribe((res: any) => {
        if (res.body.status) {
          this.toastrService.success('Successfully updated\n');
          this.closePoup();
          this.onPageChange(1);
        }
      }, error => {
        this.toastrService.error(error);
      });
    } else {
      this.networkService.addNew(body).subscribe((res: any) => {
        if (res.body.status) {
          this.toastrService.success('Successfully added new\n');
          this.closePoup();
          this.onPageChange(1);
        }
      }, error => {
        this.toastrService.error(error);
      });
    }
  }

  changeFiles(target: any) {
    if (target && target.files[0]) {
      /*const input = document.getElementById('supportingDocument');
      input.setAttribute('value', null);*/
      // this.nameFile = target.files[0].name;
      // this.f.supportingDocumentName.setValue(target.files[0].name);
      const size = Math.round(((target.files[0].size / (1024 * 1024)) + Number.EPSILON) * 1000) / 1000;
      const type = target.files[0].type;
      console.log('typeFile: ' + type);
      console.log('Size file: ' + size + ' MB');
      if (size > 50 || !['jpg', 'gif', 'pdf', 'png'].includes(type.split('/')[1])) {
        this.toastrService.warning('');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => {
          this.f.ICON.setValue(reader.result);
          this.f.NAMEICON.setValue(target.files[0].name);
        };
      }
    }
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.getNetworks();
  }

  onPageChange(pageNum: number) {
    this.pageNumber = pageNum;
    this.getNetworks();
  }

  addLink() {
    if (!this.links) {
      this.links = [];
    }
    const item = new NetWorkMember();
    item.STATUS = 'A';
    item.TYPE = 1;
    item.ORDER = this.links.length + 1;
    this.links.push(item);
  }

  addLinkAdress() {
    if (!this.linksAddress) {
      this.linksAddress = [];
    }
    const item = new NetWorkMember();
    item.STATUS = 'A';
    item.TYPE = 2;
    item.ORDER = this.linksAddress.length + 1;
    this.linksAddress.push(item);
  }

  deleteLink(item) {
    const index = this.links.indexOf(item, 0);
    if (index > -1) {
      this.links.splice(index, 1);
    }
  }

  deleteLinkAddress(item) {
    const index = this.linksAddress.indexOf(item, 0);
    if (index > -1) {
      this.linksAddress.splice(index, 1);
    }
  }
}
