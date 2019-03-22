import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPagesComponent } from './content/errorpages/errorpages.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: './content/pages/pages.module#PagesModule'
  },
  {
    path: '404',
    component: ErrorPagesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
