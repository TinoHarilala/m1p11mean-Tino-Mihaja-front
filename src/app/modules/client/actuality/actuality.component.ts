import { Component } from '@angular/core';
import {FuseCardComponent} from "../../../../@fuse/components/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import { ServiceModel } from 'app/core/model/service.model';
import { ClientService } from '../client.services';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from 'app/core/model/user.model';
import { Client } from 'app/core/model/client.model';

@Component({
    selector: 'app-actuality',
    templateUrl: './actuality.component.html',
    styleUrls: ['./actuality.component.scss'],
    imports: [
        FuseCardComponent,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        NgIf,
        NgFor,
        DatePipe
    ],
    standalone: true
})
export class ActualityComponent {
    services: ServiceModel;
    user: Client

    constructor(
        private clientService: ClientService
    ){}

    ngOnInit(){
        this.clientService.getService().subscribe(
            (res: any)=>{
               this.services = res.service;
            }
        )
        this.user = JSON.parse(sessionStorage.getItem('session'));
    }
}
