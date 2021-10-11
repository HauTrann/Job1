import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './_helpers';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginComponent} from "./layouts/admin/login";
import {LayoutComponent} from "./layouts/admin/layout/layout.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin', component: LayoutComponent, loadChildren: () => import('./layouts/admin/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
  // {path: 'admin',loadChildren:  './layouts/admin/layout/layout.module#LayoutModule', canActivate: [AuthGuard] },

  // otherwise redirect to home
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { useHash: true }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
