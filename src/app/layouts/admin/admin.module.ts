import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AdminRoutingModule} from "./admin.routing.module";
import {CommonModule, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {HomeComponent} from "./home";
import {NetworkComponent} from "./network/network.component";
import {MailComponent} from "./mail/mail.component";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    HomeComponent,
    NetworkComponent,
    MailComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    CommonModule,
    NgbPaginationModule,
  ],
  providers: [
  ]
})
export class AdminModule {
}
