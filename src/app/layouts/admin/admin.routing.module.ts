import {RouterModule, Routes} from "@angular/router";
import {NetworkComponent} from "./network/network.component";
import {MailComponent} from "./mail/mail.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home";

const routes: Routes = [
  {
    path: 'network',
    component: NetworkComponent
  },
  {
    path: 'mail',
    component: MailComponent
  },
  {
    path: '',
    component: NetworkComponent
  },
  { path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
