import { DatePipe, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { UserService } from "../user.services";
import { User } from "app/core/model/user.model";
import { MatTimepickerModule } from "mat-timepicker";
import { catchError, of, tap } from "rxjs";
import { Service } from "app/modules/admin/service/service.service";
import { MatDialog } from "@angular/material/dialog";
import { CommissionComponent } from "../commission/commission.component";


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    imports: [
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTimepickerModule,
        DatePipe,
        NgIf,
        NgFor,
        MatProgressSpinnerModule,
        CdkDrag,
        CdkDropList,
        CdkDropListGroup
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
        DatePipe
    ]
})
export class ProfileComponent {
    profileForm: FormGroup;
    dateTimeForm: FormGroup;
    commission: number;
    user: any;
    isLoading: boolean = false;
    workingHours: any;
    services: Service[];

    constructor(
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private userService: UserService,
        private service: Service,
        private dialogRef: MatDialog
    ) { }

    ngOnInit() {
        this.initForm();
        this.getProfil();
        this.getService();
    }

    private initForm() {
        this.profileForm = this.formBuilder.group({
            nom: [null, Validators.required],
            dateNaissance: [null, Validators.required],
            adresse: [null, Validators.required],
            email: [null, Validators.required],
            contact: [null, Validators.required],
            password: [null]
        })

        this.dateTimeForm = this.formBuilder.group({
            startTime: [null, Validators.required],
            endTime: [null, Validators.required]
        })
    }

    private getCommission() {
        this.userService.getActualyCommission(this.user._id, this.convertDate()).subscribe(
            (res: any) => {
                this.commission = res.commissions
            }
        )
    }

    private getService() {
        this.isLoading = true;
        this.service.getList().subscribe(
            (res: any) => {
                this.isLoading = false;
                this.services = res.service
            }
        )
    }

    private setValue() {
        this.profileForm.patchValue({
            nom: this.user.nom,
            dateNaissance: this.datePipe.transform(this.user.dateNaissance, "dd-MMM-yyyy"),
            adresse: this.user.adresse,
            email: this.user.email,
            contact: this.user.contact
        })
        this.dateTimeForm.patchValue({
            startTime: this.revertDate(this.workingHours?.startTime),
            endTime: this.revertDate(this.workingHours?.endTime)
        })

    }

    private transformDate = (date: string) => this.datePipe.transform(new Date(date), 'HH:mm');

    private getProfil() {
        const session = JSON.parse(sessionStorage.getItem('session'));

        this.userService.getUserById(session._id).subscribe(
            (res: any) => {
                this.user = res.employe
                this.workingHours = res.workingHours[0]
                if (res) {
                    this.setValue()
                    this.getCommission();
                }

            }
        )
    }

    private revertDate(value: string) {

        const timeParts = value?.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date

    }

    convertDate() {
        const now = new Date();
        const mois = now.getMonth() + 1;
        const annee = now.getFullYear();

        return `?mois=${mois}&annee=${annee}`;
    }

    update() {
        const inputValue = this.profileForm.getRawValue();
        const dateValue = this.dateTimeForm.getRawValue();
        const body = {
            employe: {
                nom: inputValue.nom,
                dateNaissance: inputValue.dateNaissance,
                adresse: inputValue.adresse,
                email: inputValue.email,
                contact: inputValue.contact,
                _id: this.user._id,
                password: inputValue.password
            },
            workingHours: {
                _id: this.workingHours._id,
                startTime: this.transformDate(dateValue?.startTime),
                endTime: this.transformDate(dateValue.endTime)
            }
        }


        this.userService.updateProfile(body).pipe(
            tap(() => {
                alert('Modification effectuer');
                this.getProfil();
            }),
            catchError(err => {
                return of(null)
            })
        ).subscribe()
    }

    openCommission() {
        const dialog = this.dialogRef.open(CommissionComponent, {
            width: '500px',
            data: {
                commissions: this.commission
            }
        })
    }


}   