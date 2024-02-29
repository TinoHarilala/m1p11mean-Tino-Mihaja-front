import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { ClientService } from '../client.services';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardComponent } from '@fuse/components/card';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OfferModel } from 'app/core/model/offer.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';



@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    imports: [
        MatIconModule,
        FuseCardComponent,
        MatTabsModule,
        RouterLink,
        RouterOutlet,
        NgIf,
        MatButtonModule,
        MatTableModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        NgIf,
        NgFor,
        RouterModule,
        MatExpansionModule,
        DatePipe,
    ],
    standalone: true,
    providers: [DatePipe]
})
export class HistoryComponent {
    histories = [];
    isLoadingResults: boolean = false;
    displayedColumns = ["status", "service", "employee", "date", "price", "payment"];

    constructor(
        private clientService: ClientService,
        private dialog: MatDialog
    ){}

    ngOnInit(){
        this.getHistories();
    }

    getHistories(){
        this.isLoadingResults = true
        const user = JSON.parse(sessionStorage.getItem('session'));
        this.clientService.getHistories(user?._id).subscribe(
            (res:any)=>{
                this.isLoadingResults = false;
                this.histories = res.historique         
            }
        )
    }

    openPayment(history){
        const dialogRef = this.dialog.open(PaymentComponent, {
            width: '900px',
            data: {
                history
            }
        })
        dialogRef.afterClosed().subscribe(
            (res)=>{
                if(res){
                    this.getHistories();
                }
            }
        )
    }
}