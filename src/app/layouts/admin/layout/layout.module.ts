import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutComponent} from "./layout.component";
import {LayoutRoutingModule} from "./layout-routing.module";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutRoutingModule,
  ]
})
export class LayoutModule {
}
