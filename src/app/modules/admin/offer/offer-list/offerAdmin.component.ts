import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { OfferService } from '../offer.serice';
import { OfferModel } from 'app/core/model/offer.model';
import { MatDialog } from '@angular/material/dialog';
import { OfferAddComponent } from '../offer-add/offer-add.component';
import { ServiceModel } from 'app/core/model/service.model';
import { NotificationService } from 'app/core/services/notification.service';

@Component({
    selector: 'app-offer',
    templateUrl: './offerAdmin.component.html',
    styleUrls: ['./offerAdmin.component.scss'],
    imports: [
        RouterLink,
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        NgIf,
        NgFor,
        DatePipe,
        MatIconModule,
        DatePipe,
        MatExpansionModule,

    ],
    standalone: true,
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
    ]
})
export class OfferComponent {
    isLoading: boolean = false;
    offers: OfferModel[];

    constructor(
        private offerService: OfferService,
        private dialog: MatDialog,
        private notificationService: NotificationService
    ){}

    ngOnInit(){
        this.getOfferList();
    }

    private getOfferList(){
        this.isLoading = true;
        this.offerService.getOfferList().subscribe(
            (res: any)=> {
                if (res) {
                    this.isLoading = false;
                    this.offers = res.OffreSpecial
                }
                else {
                    this.offers = []
                }
            }
        )
    }

    openAddModal(){
        const dialogRef = this.dialog.open(OfferAddComponent, {
            width: '900px',
            autoFocus: false
        })
        dialogRef.afterClosed().subscribe(result =>{
            this.getOfferList();
        })
    }

    deleteOffer(idOffer: string){
        this.isLoading = true
        this.offerService.deleteOffer(idOffer).subscribe(
            res=>{
                if (res) {
                    this.isLoading = false
                    this.getOfferList();
                    this.notificationService.success('Suppression effectuer avec succès')
                }
            }
        );
    }

    openEditModal(id: any, service: ServiceModel[], offer : OfferModel){
        const dialogRef = this.dialog.open(OfferAddComponent, {
            autoFocus: false,
            width: '900px',
            data: {
                service,
                offer
            }
        });
        const component: OfferAddComponent = dialogRef.componentInstance
        component.id = id
        dialogRef.afterClosed().subscribe(item => {
            this.getOfferList();
        });
    }
}