import {Component, OnInit} from '@angular/core';
import {ISourceOptions, Main} from "tsparticles";
import {UtilsValue} from "../store/UtilsValue";
import {NetworkService} from "../_services/network.service";
import {NetWork, NetWorkMember} from "../_models/common.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../_services/home.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  id = 'tsparticles';
  netWorks: NetWork[];
  /* or the classic JavaScript object */
  options: ISourceOptions = UtilsValue.options;
  itemSlect: NetWork;
  formSend: FormGroup;
  submitContract:boolean;
  links: NetWorkMember[];
  linksAddress: NetWorkMember[];

  constructor(private networkService: NetworkService,
              private homeService: HomeService,
              private modalService: NgbModal,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
  }

  innitForm() {
    this.formSend = this.formBuilder.group({
      FULLNAME: ['', [Validators.required]],
      EMAIL: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      PHONE: ['', [Validators.required]],
      MESSAGE: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getNetworks();
    this.innitForm();
  }

  particlesLoaded(container: any): void {
    console.log(container);
  }

  particlesInit(main: Main): void {
    console.log(main);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }

  getNetworks() {
    this.networkService.getAll().subscribe((res: any) => {
      this.netWorks = res.body;
    });
  }

  public f(){
    this.formSend?.controls;
  }

  slectItem(item) {
    this.itemSlect = item;
  }

  submitSend() {
    this.submitContract = true;
    if (this.formSend.invalid) {
      return;
    }
    const body = this.formSend.getRawValue();
    this.homeService.addContract(body).subscribe((res: any) => {
      if (res.body.status) {
        this.toastrService.success('Contact sent successfully\n');
        this.submitContract = false;
        this.formSend.reset();
      }
    });
  }

  getAllMembers(networkID) {
    this.networkService.getAllMembers(networkID).subscribe((res: any) => {
      this.links = res.body.filter(n => n.TYPE === 1).sort((a, b) => (a.ORDER < b.ORDER ? -1 : 1));
      this.linksAddress = res.body.filter(n => n.TYPE === 2).sort((a, b) => (a.ORDER < b.ORDER ? -1 : 1));
    });
  }

  openPopup(detailNetwork, item){
    if (item) {
      this.getAllMembers(item.ID);
    } else {
      this.links = [];
      this.linksAddress = [];
    }
    this.modalService.open(detailNetwork, {size: 'xl'});
  }

  closePoup() {
    this.modalService.dismissAll();
  }
}
