import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'm-errorpages',
    templateUrl: './errorpages.component.html',
})
export class ErrorPagesComponent implements OnInit {

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {
    }

}
