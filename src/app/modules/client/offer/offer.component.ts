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



@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss'],
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
        NgIf,
        NgFor,
        RouterModule,
        MatExpansionModule,
        DatePipe,
    ],
    standalone: true,
    providers: [DatePipe],
    encapsulation: ViewEncapsulation.None
})
export class OfferComponent {
    offers: OfferModel[] = [];
    displayedColumns = ['action'];
    isLoading: boolean = false;

    constructor(
        private clientService: ClientService
    ) { }

    ngOnInit() {
        this.isLoading = true
        this.clientService.getOffer().subscribe(
            (res: any) => {
                this.isLoading = false;
                this.offers = res.OffreSpecial
            }
        )
    }
}