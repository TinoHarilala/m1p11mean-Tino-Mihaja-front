import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { verifyPassword } from 'app/core/shared/verify-password.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from 'mat-timepicker';
import { DateTime } from 'luxon';
import { Service } from '../../service/service.service';
import { ServiceModel } from 'app/core/model/service.model';
import {
    CdkDrag,
    CdkDragDrop,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem
} from "@angular/cdk/drag-drop";
import { EmployeeService } from '../employee.service';
import { catchError, of, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationService } from 'app/core/services/notification.service';

@Component({
    selector: 'employee-add',
    standalone: true,
    templateUrl: './employee-add.component.html',
    imports: [
        RouterLink,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        NgIf,
        NgFor,
        NgClass,
        MatDatepickerModule,
        MatTimepickerModule,
        MatProgressSpinnerModule,
        CdkDrag,
        CdkDropList,
        CdkDropListGroup
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
    ],
})
export class EmployeeAddComponent implements OnInit {
    private datePipe: DatePipe = new DatePipe('en-US');

    employeeForm: FormGroup;
    toggle: boolean = false;
    dateTimeForm: FormGroup;
    availableServices: ServiceModel[] = [];
    selectedServices: ServiceModel[] = [];
    showNextStep: boolean = false;
    isLoading: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private service: Service,
        private employeeService: EmployeeService,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getService();
    }

    private initForm() {
        this.employeeForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            date_of_birth: ['', Validators.required],
            contact: ['', Validators.required],
            address: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4)]],
            confirm_password: ['', Validators.required],
        }, { validator: verifyPassword }
        );

        this.dateTimeForm = this._formBuilder.group({
            startTime: [null, Validators.required],
            endTime: [null, Validators.required]
        })
    }

    private transformDate = (date: string) => this.datePipe.transform(new Date(date), 'HH:mm');

    private getService() {
        this.service.getList().subscribe(
            (res: any) => {
                this.availableServices = res.service
            }
        )
    }

    private getIdsFromSelectedServices(): string[] {
        return this.selectedServices.map((service: any) => service._id);
    }

    drop(event: CdkDragDrop<string[]>, list: ServiceModel[]) {
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

    next() {
        this.showNextStep = true
    }

    toggleButton() {
        this.toggle = !this.toggle;
    }

    save() {
        this.isLoading = true;
        const inputValue = this.employeeForm.getRawValue();
        const timeInputValue = this.dateTimeForm.getRawValue();

        const body = {
            employe: {
                nom: inputValue.name,
                email: inputValue.email,
                dateNaissance: DateTime.fromISO(inputValue.date_of_birth).toString(),
                contact: inputValue.contact,
                adresse: inputValue.address,
                isManager: this.toggle ? 1 : 0,
                services: this.getIdsFromSelectedServices(),
                password: inputValue.password
            },
            workingHours: {
                startTime: this.transformDate(timeInputValue.startTime),
                endTime: this.transformDate(timeInputValue.endTime)
            }
        }

        this.employeeService.add(body).pipe(
            tap(() => {
                this.notificationService.success('Ajout effectuer avec succès')
                this._router.navigate(['employee/list']);
                this.isLoading = false;
                
            }),
            catchError(err => {
                this.notificationService.success(err.error.error)
                return of(null)
            })
        ).subscribe()

    }
}