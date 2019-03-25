import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainPageComponent } from './mainpage/mainpage.component';
import { SecondPageComponent } from './secondpage/secondpage.component';
import { KMeansPageComponent } from './kmeanspage/kmeanspage.component';
import { GnssPageComponent } from './gnss/gnss.component';
import { GnssDbscanPageComponent } from './gnssdbscan/gnssdbscan.component';
import { GnssKMeansPageComponent } from './gnsskmeans/gnsskmeanspage.component';
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
	{
		path: 'gnssdbscan1',
		component: GnssDbscanPageComponent,
	},
	{
		path: 'gnsskmeans1',
		component: GnssKMeansPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule { }
