import {Component, Input} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ExpenseService} from "../expense.service";
import {catchError, of, tap} from "rxjs";
import { NotificationService } from 'app/core/services/notification.service';

@Component({
    selector: 'app-expense-add-modal',
    templateUrl: './expense-add-modal.component.html',
    styleUrls: ['./expense-add-modal.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        MatDialogModule,
        MatButtonModule
    ],
    standalone: true,
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {subscriptSizing: 'dynamic'}}
    ],
})
export class ExpenseAddModalComponent {
    expenseForm: FormGroup;
    @Input() id: number

    constructor(
        public dialogRef: MatDialogRef<ExpenseAddModalComponent>,
        private formBuilder: FormBuilder,
        private expenseService: ExpenseService,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.initForm();
        this.getExpenseById(this.id)
    }

    private initForm() {
        this.expenseForm = this.formBuilder.group({
            montant: [null, Validators.required],
            description: [null, Validators.required]
        })
    }

    getExpenseById(id: any){
        this.expenseService.getExpenseById(id).subscribe(res=>{
            this.expenseForm.patchValue({
                montant: res.Depense.montant,
                description: res.Depense.description
            })
        })
    }

    editExpense(){
        const data = {
            _id: this.id,
            description: this.expenseForm.get('description').value,
            montant: this.expenseForm.get('montant').value,
        }
        if (this.expenseForm.valid) {
            this.expenseService.update(data).subscribe(res=>{
                if (res){
                    this.notificationService.success('Modification effectuer avec succès')
                    this.dialogRef.close(true)
                }
            })
        }
    }

    save() {
        const inputValue = this.expenseForm.getRawValue();
        if (this.expenseForm.valid) {
            this.expenseService.create(inputValue).pipe(
                tap(() => {
                    this.dialogRef.close(true);
                    this.notificationService.success('Ajout effectuer avec succès')
                }),
                catchError(err => {
                    this.notificationService.error(err.error.error)
                    return of(null)
                })
            ).subscribe();
        }
    }

}
