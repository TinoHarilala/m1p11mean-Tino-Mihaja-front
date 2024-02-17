import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { AdminService } from '../../admin.services';
import { NgIf } from "@angular/common";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'employee',
    standalone: true,
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    imports: [
        MatTableModule,
        RouterLink,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        NgIf,
        RouterModule
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
    ],
})
export class EmployeeComponent implements OnInit {
    searchForm: FormGroup;
    searchControl: UntypedFormControl = new UntypedFormControl();
    displayedColumns = ['name', 'address', 'contact', 'email', 'action'];
    data: any = [];
    isLoadingResults: boolean = true
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(
        private adminService: AdminService
    ) {
    }

    ngOnInit(): void {
        this.getEmployee();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private getEmployee() {
        this.adminService.getEmployeeList().subscribe(
            (res: any) => {
                this.isLoadingResults = false;
                this.data = res.employe
            }
        );
    }
}