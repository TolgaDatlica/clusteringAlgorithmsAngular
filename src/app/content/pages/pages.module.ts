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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PagesRoutingModule,
		NgbModule
	],
	declarations: [
		PagesComponent,
		MainPageComponent,
		SecondPageComponent,
		KMeansPageComponent
	],
	providers: [MainPageService, SecondPageService, KMeansPageService]
})
export class PagesModule { }
