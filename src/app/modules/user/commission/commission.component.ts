import { DatePipe, NgFor, NgIf } from "@angular/common";
import { Component, Inject, Input } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
    selector: 'commission-add',
    standalone: true,
    templateUrl: './commission.component.html',
    imports: [
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        NgIf,
        NgFor,
        DatePipe,
        MatProgressSpinnerModule,
        CdkDrag,
        CdkDropList,
        CdkDropListGroup
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
    ]
})
export class CommissionComponent {

    constructor(
        public dialogRef: MatDialogRef<CommissionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){
    }

}