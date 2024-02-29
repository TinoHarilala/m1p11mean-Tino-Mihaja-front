import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { FuseCardComponent } from '@fuse/components/card';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientService } from '../client.services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';



@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    imports: [
        MatIconModule,
        FuseCardComponent,
        MatTabsModule,
        RouterLink,
        RouterOutlet,
        NgIf,
        MatButtonModule,
        MatTableModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        NgFor,
        NgClass,
        RouterModule,
        MatExpansionModule,
        DatePipe,
    ],
    standalone: true,
    providers: [DatePipe]
})
export class NotificationComponent {
    notifications: any
    notifLength: number
    status: number
    user: any
    constructor(
        private clientService: ClientService,
        public dialogRef: MatDialogRef<NotificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}

    ngOnInit(){
        this.notifications = this.data.notifications
        this.user = JSON.parse(sessionStorage.getItem('session'))
    }

    updateStatus(notification: any){     
        this.clientService.sharedNotificationLength(true)

        if( notification.status == 0) {            
            this.clientService.updateNotificationStatus(notification._id).subscribe(
                (res)=>{
                    this.clientService.getNotification(this.user._id).subscribe(
                        (res: any)=>{
                            this.notifications = res.notifications
                            this.clientService.sharedNotificationLength(true)
                        }
                    )
                }
            );
        }
    }
}