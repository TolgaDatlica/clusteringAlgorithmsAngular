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
import { MLSPageComponent } from './mlspage/mlspage.component';
import { MLSPageService } from './mlspage/mlspage.service';
import { CombainPageComponent } from './combainpage/combainpage.component';
import { CombainPageService } from './combainpage/combainpage.service';
import { SpatioTemporalPageComponent } from './spatiotemporal/spatiotemporal.component';
import { SpatioTemporalService } from './spatiotemporal/spatiotemporal.service';
import { SkyHookPageComponent } from './skyhookpage/skyhookpage.component';
import { SkyHookPageService } from './skyhookpage/skyhookpage.service';
import { GoogleLocationPageComponent } from './googlelocation/googlelocation.component';
import { GoogleLocationPageService } from './googlelocation/googlelocation.service';
import { NavizonPageComponent } from './navizonpage/navizonpage.component';
import { NavizonPageService } from './navizonpage/navizonpage.service';
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
		GnssKMeansPageComponent,
		MLSPageComponent,
		CombainPageComponent,
		SpatioTemporalPageComponent,
		SkyHookPageComponent,
		GoogleLocationPageComponent,
		NavizonPageComponent
	],
	providers: [MainPageService, SecondPageService, KMeansPageService, GnssService, GnssDbscanService, GnssKMeansPageService,
		MLSPageService, CombainPageService, SpatioTemporalService, SkyHookPageService, GoogleLocationPageService, NavizonPageService]
})
export class PagesModule { }
