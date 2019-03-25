import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainPageComponent } from './mainpage/mainpage.component';
import { SecondPageComponent } from './secondpage/secondpage.component';
import { MainPageService } from './mainpage/mainpage.service';
import { SecondPageService } from './secondpage/secondpage.service';
import { KMeansPageComponent } from './kmeanspage/kmeanspage.component';
import { KMeansPageService } from './kmeanspage/kmeanspage.service';
import { GnssPageComponent } from './gnss/gnss.component';
import { GnssService } from './gnss/gnss.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlotlyModule } from 'angular-plotly.js';
import { GnssDbscanPageComponent } from './gnssdbscan/gnssdbscan.component';
import { GnssDbscanService } from './gnssdbscan/gnssdbscan.service';
import { GnssKMeansPageComponent } from './gnsskmeans/gnsskmeanspage.component';
import { GnssKMeansPageService } from './gnsskmeans/gnsskmeanspage.service';
@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PagesRoutingModule,
		NgbModule,
		PlotlyModule
	],
	declarations: [
		PagesComponent,
		MainPageComponent,
		SecondPageComponent,
		KMeansPageComponent,
		GnssPageComponent,
		GnssDbscanPageComponent,
		GnssKMeansPageComponent
	],
	providers: [MainPageService, SecondPageService, KMeansPageService, GnssService, GnssDbscanService, GnssKMeansPageService]
})
export class PagesModule { }
