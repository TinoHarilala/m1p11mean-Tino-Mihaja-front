import {  Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../user.services';
import {catchError, debounceTime, filter, map, of, Subject, takeUntil, tap} from 'rxjs';
import {NotificationService} from "../../../core/services/notification.service";


@Component({
    selector: 'app-task',
    standalone: true,
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
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
        NgClass,
        RouterModule,
        DatePipe,
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
        CommonModule
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
    ],
    encapsulation: ViewEncapsulation.None,

})
export class TaskComponent implements OnInit {
    tasks: any
    matDrawerStatus: boolean = false;
    selectedTask: any
    isLoadingResults: boolean = false;

    constructor(
        private userService: UserService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.getTask();
    }

    private getTask() {
        this.isLoadingResults = true
        const user = JSON.parse(sessionStorage.getItem('session'));

        this.userService.getTask(user._id).subscribe(
            (res: any) => {
                this.isLoadingResults = false;
                this.tasks = res.rendezVous
            }
        )
    }

    openMatDrawer(task) {
        this.matDrawerStatus = true;
        this.selectedTask = task
    }

    closeFuseDrawer() {
        this.matDrawerStatus = false;
    }

    updateStatus(){
        this.userService.updateTaskStatus(this.selectedTask._id).pipe(
            tap(()=>{
                this.notificationService.success('Modification effectuer avec succès')
                this.getTask();
            }),
            catchError(err => {
                this.notificationService.error(err.error.error);
                return of(null)
            })
        ).subscribe()
    }
}
