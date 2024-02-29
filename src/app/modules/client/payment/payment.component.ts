import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { ClientService } from '../client.services';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardComponent } from '@fuse/components/card';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OfferModel } from 'app/core/model/offer.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { User } from 'app/core/model/user.model';
import { catchError, of, tap } from 'rxjs';
import { an } from '@fullcalendar/core/internal-common';
import { NotificationService } from 'app/core/services/notification.service';



@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
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
        MatInputModule,
        MatTooltipModule,
        NgIf,
        NgFor,
        RouterModule,
        MatExpansionModule,
        DatePipe,
    ],
    standalone: true,
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
    ]
})
export class PaymentComponent {
    amountForm: FormGroup;
    history: any;
    details = [];
    user: User;
    toPaid: number;
    leftToPay: number;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private clientService: ClientService,
        public dialogRef: MatDialogRef<PaymentComponent>,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.amountForm = this.formBuilder.group({
            amount: [null, Validators.required]
        })
        this.history = this.data.history
        this.user = JSON.parse(sessionStorage.getItem('session'))
        this.getDetailHistory(this.data.history._id, this.user._id);
    }

    private getDetailHistory(idHistory: string, idClient: string) {
        this.clientService.getDetailHistory(idHistory, idClient).subscribe(
            (res: any) => {
                this.details = res.details
                let dernierElement = res.details[res.details.length - 1];

                this.toPaid = dernierElement.aPayer;
                this.leftToPay = dernierElement.reste;
            }
        )
    }

    save() {
        const inputValue = this.amountForm.getRawValue();
        const body = {
            idRendezVousClient: this.data.history._id,
            idClient: this.user._id,
            montant: inputValue.amount
        }
        this.clientService.payment(body).pipe(
            tap(() => {
                this.notificationService.success('Payment effectué avec seccès')
                this.getDetailHistory(this.data.history._id, this.user._id);
                this.resetForm();
                this.dialogRef.close(true)
            }),
            catchError(err => {
                this.notificationService.error(err.error.error)
                return of(null)
            })
        ).subscribe()
    }

    private resetForm() {
        this.amountForm.patchValue({
            amount: 0
        })
    }
}