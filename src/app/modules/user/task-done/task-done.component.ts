import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user.services';

@Component({
    selector: 'app-task-done',
    templateUrl: './task-done.component.html',
    imports: [
        RouterLink,
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        NgIf,
        NgClass,
        MatIconModule,
        DatePipe
    ],
    standalone: true,
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
    ]
})
export class TaskDoneComponent {
    displayedColumns = ['name', 'contact', 'service', 'commission', 'price', 'status', 'date']
    data: any = []
    isLoadingResults: boolean = false;

    constructor(
        private userService: UserService
    ){}

    ngOnInit(){
        this.getTaskDoneList()
    }

    private getTaskDoneList(){
        this.isLoadingResults = true
        const user = JSON.parse(sessionStorage.getItem('session'))
        this.userService.getTaskDoneList(user._id).subscribe(
            (res: any)=>{
                this.isLoadingResults = false;
                this.data = res.rendezVous
            }
        )
    }
}