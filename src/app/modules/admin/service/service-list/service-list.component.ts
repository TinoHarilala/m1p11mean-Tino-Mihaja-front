import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { ServiceModel } from "app/core/model/service.model";
import { Service } from "../service.service";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from "@angular/material/dialog";
import { ServiceAddComponent } from "../service-add/service-add.component";
import { debounceTime, filter, map, Subject, takeUntil } from "rxjs";
import { MatInputModule } from "@angular/material/input";


@Component({
    selector: 'service',
    standalone: true,
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
    imports: [
        MatTableModule,
        RouterLink,
        MatIconModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        NgFor
    ]
})
export class ServiceListComponent implements OnInit {
    searchForm: FormGroup;
    searchControl: UntypedFormControl = new UntypedFormControl();

    services: ServiceModel[] = [];
    isLoading: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(
        private service: Service,
        public dialog: MatDialog,
        private fb: FormBuilder,

    ) { }

    ngOnInit(): void {
        this.getService();
        this.searchForm = this.fb.group({
            searchValue: [''],
        });
        this.search()
    }

    private getService() {
        this.isLoading = true
        this.service.getList().subscribe(
            (res: any) => {
                this.isLoading = false;
                this.services = res.service;
            }
        )
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    editService(id: any, service: ServiceModel) {
        const dialogRef = this.dialog.open(ServiceAddComponent, {
            autoFocus: false,
            width: '600px',
            data: {
                service
            }
        });
        const component: ServiceAddComponent = dialogRef.componentInstance
        component.id = id
        dialogRef.afterClosed().subscribe(item => {
            this.getService();
        });
    }

    openAddServiceModal() {
        const dialogRef = this.dialog.open(ServiceAddComponent, {
            autoFocus: false,
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(item => {
            this.getService();
        });
    }

    search() {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(1000),
                takeUntil(this._unsubscribeAll),
                map((value) => {
                    this.services = []
                    this.isLoading = true
                    if (!value || value.length < 2) {
                        this.getService()
                    }
                    return value;
                }),
                filter(value => value !== undefined && value !== null && value !== '' && value.length >= 2),
            ).subscribe((value) => {
                this.service.search(value).subscribe(res => {
                    this.isLoading = false
                    this.services = res.service
                })
            })
    }
}
