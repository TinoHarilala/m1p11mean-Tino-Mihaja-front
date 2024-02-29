import { Component, Inject, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgFor, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { catchError, of, tap } from "rxjs";
import { OfferService } from '../offer.serice';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OfferModel } from 'app/core/model/offer.model';
import { Service } from '../../service/service.service';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ServiceModel } from 'app/core/model/service.model';
import { DateTime } from 'luxon';
import { NotificationService } from 'app/core/services/notification.service';

@Component({
    selector: 'app-offer-add',
    templateUrl: './offer-add.component.html',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        NgFor,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        CdkDrag,
        CdkDropList,
        CdkDropListGroup
    ],
    standalone: true,
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
    ],
})
export class OfferAddComponent {
    offerForm: FormGroup;
    services: Service[] = [];
    selectedServices: string[] = [];
    availableServices: ServiceModel[] = [];
    isLoading: boolean = false;
    @Input() id: number;

    constructor(
        private offerService: OfferService,
        private formBuilder: FormBuilder,
        private Service: Service,
        public dialogRef: MatDialogRef<OfferAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private notificationService: NotificationService,
    ) {
    }

    ngOnInit() {
        this.offerForm = this.formBuilder.group({
            title: [null, Validators.required],
            description: [null, Validators.required],
            services: [null],
            remise: [null, Validators.required],
            start: [null, Validators.required],
            end: [null, Validators.required]
        })
        this.getService();
        if (this.id) {
            this.selectedServices = this.data.service;
            this.setDataOffer();
        }
    }

    private setDataOffer() {
        const offer = this.data?.offer;
        this.offerForm.patchValue({
            title: offer.title,
            description: offer.description,
            remise: offer.remise,
            start: offer.start,
            end: offer.end
        })
    }

    private getService() {
        this.isLoading = true;
        this.Service.getList().subscribe(
            (res: any) => {
                this.isLoading = false;
                this.availableServices = res.service
                if (this.id) {
                    this.availableServices = res.service.filter(employe => {
                        return !this.selectedServices.some((selected: any) => selected._id === employe._id);
                    });
                }
            }
        )
    }

    toggleSelection(serviceId: string): void {
        this.selectedServices.push(serviceId)
    }

    save() {
        this.isLoading = true;
        const services = this.getIdsFromSelectedServices();
        const inputValue = this.offerForm.getRawValue();
        const body = {
            title: inputValue.title,
            description: inputValue.description,
            services: services,
            remise: inputValue.remise,
            start: DateTime.fromISO(inputValue.start).toString(),
            end: DateTime.fromISO(inputValue.end).toString()
        }

        if (this.id) {
            if (this.offerForm.valid) {
                this.offerService.updateOffer({ ...body, _id: this.id }).pipe(
                    tap(() => {
                        this.dialogRef.close();
                        this.isLoading = false;
                        this.notificationService.success('Modification effectuer avec succès!')
                    }),
                    catchError(err => {
                        this.notificationService.success(err.error.error)
                        this.isLoading = true;
                        return of(null)
                    })
                ).subscribe()
            }
        }
        else {
            if (this.offerForm.valid) {
                this.offerService.createOffer(body).pipe(
                    tap(() => {
                        this.notificationService.success('Ajout effectuer avec succès!')
                        this.isLoading = true;
                        this.dialogRef.close();
                    }),
                    catchError((err) => {
                        this.notificationService.success(err.error.error)
                        this.isLoading = true;
                        return of(null)
                    })
                ).subscribe()
            }
        }
    }

    drop(event: CdkDragDrop<string[]>, list: any[]) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    private getIdsFromSelectedServices(): string[] {
        return this.selectedServices.map((service: any) => service._id);
    }
}