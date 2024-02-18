import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { catchError, of, Subject, tap } from "rxjs";
import { AdminService } from "../../admin.services";
import { User } from "app/core/model/user.model";
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Service } from "../service.service";

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
    availableEmployee: User[] = [];
    selectedEmployee: User[] = [];
    isLoading: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<ServiceAddComponent>,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private sevice: Service
    ) { }

    ngOnInit() {
        this.initForm();
        this.getEmployee();
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
        const inputValue = this.serviceForm.getRawValue();
        const body = {
            nom: inputValue.name,
            prix: inputValue.price,
            duree: inputValue.duration,
            commission: inputValue.commission  
            // image
            // employees      
        }
        console.log(body);
        
         this.sevice.create(body).pipe(
            tap(()=>{
                this.dialogRef.close();
            }),
            catchError(err => {
                console.log(err);
                return of(null)
            })
        ).subscribe()       
    }

    toggleButton() {
        this.toggle = !this.toggle;
    }
}