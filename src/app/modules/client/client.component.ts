import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {ActualityComponent} from "./actuality/actuality.component";
import { Client } from 'app/core/model/client.model';
import { OfferComponent } from './offer/offer.component';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    imports: [
        MatIconModule,
        MatTabsModule,
        RouterLink,
        RouterOutlet,
        NgIf,
        ActualityComponent,
        OfferComponent
    ],
    standalone: true
})
export class ClientComponent {
    selectedTabIndex: number = 0;
    client: Client;

    ngOnInit(){
        this.client = JSON.parse(sessionStorage.getItem('session'));
    }
}
