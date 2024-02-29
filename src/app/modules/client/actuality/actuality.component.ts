import { Component, EventEmitter, Output } from '@angular/core';
import { FuseCardComponent } from "../../../../@fuse/components/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { ServiceModel } from 'app/core/model/service.model';
import { ClientService } from '../client.services';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from 'app/core/model/user.model';
import { Client } from 'app/core/model/client.model';
import { Service } from 'app/modules/admin/service/service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarComponent } from '../calendar/calendar.component';
import { Subject } from 'rxjs';

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
    services: ServiceModel[];
    user: Client;
    isLoading: boolean = false;

    @Output() navigatePayment = new EventEmitter<number>();

    constructor(
        private clientService: ClientService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.isLoading = true
        this.clientService.getService().subscribe(
            (res: any) => {
                this.isLoading = false
                this.services = res.service;
            }
        )
        this.user = JSON.parse(sessionStorage.getItem('session'));
    }

    reserve(service: ServiceModel) {
        const dialogRef = this.dialog.open(CalendarComponent, {
            autoFocus: false,
            width: '950px',
            data: service
        });
        dialogRef.afterClosed().subscribe((res)=>{
            if (res) {
                this.navigatePayment.emit(2)
            }
        }
        )
    }
}
