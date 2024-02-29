import { NgFor, NgIf } from "@angular/common";
import { Component, Inject, Input } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { catchError, of, Subject, tap } from "rxjs";
import { AdminService } from "../../admin.services";
import { User } from "app/core/model/user.model";
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Service } from "../service.service";
import { lowerFirst } from "lodash-es";
import { NotificationService } from "app/core/services/notification.service";

@Component({
    selector: 'service-add',
    standalone: true,
    templateUrl: './service-add.component.html',
    imports: [
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        NgIf,
        NgFor,
        MatProgressSpinnerModule,
        CdkDrag,
        CdkDropList,
        CdkDropListGroup
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
    ]
})
export class ServiceAddComponent {
    image: string = '';
    toggle: boolean;
    serviceForm: FormGroup;
    availableEmployee: any[] = [];
    selectedEmployee: any[] = [];
    isLoading: boolean = false;
    @Input() id: any
    employe: any[];

    constructor(
        public dialogRef: MatDialogRef<ServiceAddComponent>,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private service: Service,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.initForm();
        this.getEmployee();
        this.setService();
    }

    setService() {
        this.serviceForm.patchValue({
            name: this.data.service.nom,
            price: this.data.service.prix,
            duration: this.data.service.duree,
            commission: this.data.service.commission
        })
    }

    update() {
        const formValue = this.serviceForm.getRawValue()
        const body = {
            _id: this.id,
            nom: formValue.name,
            prix: formValue.price,
            duree: formValue.duration,
            commission: formValue.commission
        }
        this.service.update(body).subscribe(res => {
            if (res) {
                this.dialogRef.close(true)
                this.notificationService.success('Modification effetuer avec succès')
            }
        })
    }

    private initForm() {
        this.serviceForm = this.formBuilder.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            duration: ['', Validators.required],
            commission: ['', Validators.required]
        })
    }

    private getEmployee() {
        if (this.id) {
            // this.availableEmployee = []
        }
        this.adminService.getEmployeeList().subscribe(
            (res: any) => {
                this.availableEmployee = res.employe
            }
        );
    }

    private _readAsDataURL(file: File): Promise<any> {
        // Return a new promise
        return new Promise((resolve, reject) => {

            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void => {
                this.image = reader.result as string;
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void => {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }

    private getSelectedEmployee() {
        this.service.getById(this.id).subscribe(
            (res) => {
                this.selectedEmployee = res.service[0].employe
                this.availableEmployee = this.availableEmployee.filter(employe => {
                    return !this.selectedEmployee.some(selected => selected._id === employe._id);
                  });
            }
        )
    }

    uploadImage(fileList: FileList): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        this._readAsDataURL(file).then((data) => {

            this.image = data

            // Update the note
            //  this.serviceChanged.next(service);

        });
    }

    drop(event: CdkDragDrop<string[]>, list: User[]) {
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

    save() {
        this.employe = this.selectedEmployee.map(result => result._id)
        const inputValue = this.serviceForm.getRawValue();
        const body = {
            service: {
                nom: inputValue.name,
                prix: inputValue.price,
                duree: inputValue.duration,
                commission: inputValue.commission,
            },
            // image
            employe: this.employe
        }

        this.service.create(body).pipe(
            tap(() => {
                this.dialogRef.close();
                this.notificationService.success('Ajout effectuer avec succès')
            }),
            catchError(err => {
                this.notificationService.success(err.error.error)
                return of(null)
            })
        ).subscribe()
    }

    toggleButton() {
        this.toggle = !this.toggle;
        if (this.id) {
            this.getSelectedEmployee();
        }
    }

    deleteService(){
        this.service.delete(this.id).subscribe(res=>{
            if (res){
                this.dialogRef.close()
                this.notificationService.success('Suppression effectuer avec succès')
            }
        })
    }
}
