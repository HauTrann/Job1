import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path:'',
    // component: LayoutComponent,
    loadChildren: () => import('../admin.module').then(m => m.AdminModule)
    /*children:[
      {
        path: 'network',
        component: NetworkComponent
      },
      {
        path: 'mail',
        component: MailComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
