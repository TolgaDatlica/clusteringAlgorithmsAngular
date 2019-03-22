import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';

@Component({
	selector: 'm-pages',
	templateUrl: './pages.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent implements OnInit, AfterViewInit {

	public player: AnimationPlayer;

	// class for the header container
	pageBodyClass$: BehaviorSubject<string> = new BehaviorSubject<string>('');

	@ViewChild('mContentWrapper') contenWrapper: ElementRef;
	@ViewChild('mContent') mContent: ElementRef;

	constructor() {

	}

	ngOnInit(): void {

	}

	ngAfterViewInit(): void {
	}
}
