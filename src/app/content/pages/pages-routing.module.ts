import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainPageComponent } from './mainpage/mainpage.component';
import { SecondPageComponent } from './secondpage/secondpage.component';
import { KMeansPageComponent } from './kmeanspage/kmeanspage.component';
import { GnssPageComponent } from './gnss/gnss.component';
const routes: Routes = [
	{
		path: '',
		component: MainPageComponent,
	},
	{
		path: 'dbscan1',
		component: SecondPageComponent,
	},
	{
		path: 'kmeans1',
		component: KMeansPageComponent,
	},
	{
		path: 'gnss',
		component: GnssPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule { }
