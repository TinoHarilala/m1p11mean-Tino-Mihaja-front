import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DatePipe, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {ExpenseService} from "../expense.service";
import {MatDialog} from "@angular/material/dialog";
import {ExpenseAddModalComponent} from "../expense-add-modal/expense-add-modal.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {data} from "autoprefixer";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from 'app/core/services/notification.service';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss'],
    imports: [
        RouterLink,
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        NgIf,
        MatIconModule,
        DatePipe
    ],
    standalone: true,
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
    ]
})
export class ExpenseComponent {
    data = [];
    displayedColumns = ['description', 'amount', 'isDeleted', 'action'];
    isLoadingResults: boolean = false;
    totalExpense: any;
    total: number;
    constructor(
        private expenseService: ExpenseService,
        private dialog: MatDialog,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.isLoadingResults = true;
        this.expenseService.getList().subscribe(
            (res: any) => {
                this.isLoadingResults = false;
                this.data = res.Depense;
                this.totalExpense = this.data.reduce((acc, resultat) => acc + resultat.montant, 0)
            }
        )
    }

    deleteExpense(id: number){
        this.expenseService.deleteExpense(id).subscribe(res=>{
            if (res){
                this.getList()
                this.notificationService.success('Suppression effectuer avec succès')
            }
        })
        
    }

    openAddModal() {
        const dialogRef = this.dialog.open(ExpenseAddModalComponent, {
            width: '500px',
            autoFocus: false
        })
        dialogRef.afterClosed().subscribe(result =>{
            this.getList()
        })
    }

    editExpense(id){
        const dialogRef = this.dialog.open(ExpenseAddModalComponent, {
            width: '500px',
            autoFocus: false
        })
        const component: ExpenseAddModalComponent = dialogRef.componentInstance
        component.id = id
        dialogRef.afterClosed().subscribe(result =>{
            this.getList()
        })
    }

    dateChange(event: any){
        this.isLoadingResults = true;
        this.data = [];
        this.expenseService.getExpenseByDate(event.value.c.month, event.value.c.year ).subscribe(
            (res: any)=>{
                this.isLoadingResults = false;
                this.data = res.Depense   
                this.totalExpense = null
                this.total = res.Total[0]?.total || 0       
            }
        )
    }

    resetTable(){
        this.getList();
    }
}
