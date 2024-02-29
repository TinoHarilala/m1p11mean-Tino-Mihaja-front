import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AdminService } from '../../admin.services';
import { NgFor, NgIf } from "@angular/common";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { User } from 'app/core/model/user.model';
import { EmployeeDetailsComponent } from '../employee.details/employee-details.component';
import { EmployeeService } from '../employee.service';
import {debounceTime, filter, map, Subject, takeUntil} from "rxjs";


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
        NgFor,
        RouterModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatIconModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        EmployeeDetailsComponent
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
    ],
    encapsulation: ViewEncapsulation.None,


})
export class EmployeeComponent implements OnInit {

    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    searchForm: FormGroup;
    searchControl: UntypedFormControl = new UntypedFormControl();
    displayedColumns = ['name', 'address', 'contact', 'email', 'action'];
    employees: User[];
    isLoadingResults: boolean = true
    drawerMode: 'side' | 'over';
    selectedEmployee: User;
    matDrawerStatus: boolean = false;
    employeeSelected: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(
        private adminService: AdminService,
        private _changeDetectorRef: ChangeDetectorRef,
        private employeeService: EmployeeService,
        private fb: FormBuilder,

    ) {
    }

    ngOnInit(): void {
        this.getEmployee();
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected contact when drawer closed
                //  this.selectedContact = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
        this.searchForm = this.fb.group({
            searchValue: [''],
          });
          this.search()
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
      }

    private getEmployee() {
        this.adminService.getEmployeeList().subscribe(
            (res: any) => {
                this.isLoadingResults = false;
                this.employees = res.employe
            }
        );
    }

    openMatDrawer(employee: User) {        
        this.matDrawerStatus = true;
        this.employeeService.sharedEmployee(employee);
    }

    closeFuseDrawer(event: any) {
        this.matDrawerStatus = false;
    }

    search() {
        this.searchControl.valueChanges
          .pipe(
            debounceTime(1000),
            takeUntil(this._unsubscribeAll),
            map((value) => {
              this.employees = []
              this.isLoadingResults = true
              if (!value || value.length < 2) {
                this.getEmployee()
              }
              return value;
            }),
            filter(value => value !== undefined && value !== null && value !== '' && value.length >= 2),
          ).subscribe((value) => {
          this.employeeService.search(value).subscribe(res => {
            this.isLoadingResults = false
            this.employees = res.employe
          })
        })
      }
}