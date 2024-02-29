import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { NgIf } from "@angular/common";
import { ActualityComponent } from "./actuality/actuality.component";
import { Client } from 'app/core/model/client.model';
import { OfferComponent } from './offer/offer.component';
import { HistoryComponent } from './history/history.component';
import { NotificationComponent } from './notification/notification.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from './client.services';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from 'app/core/auth/auth.service';
import { ReferenceComponent } from './preference/reference.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    imports: [
        MatIconModule,
        MatTabsModule,
        RouterLink,
        RouterOutlet,
        NgIf,
        ActualityComponent,
        OfferComponent,
        HistoryComponent,
        NotificationComponent,
        MatBadgeModule,
        ReferenceComponent,
        MatButtonModule,

    ],
    standalone: true
})
export class ClientComponent {
    selectedTabIndex: number = 0;
    client: Client;
    notificationsLength: number;
    notifications: any[] = []
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private dialog: MatDialog,
        private clientService: ClientService
    ) { }

    ngOnInit() {
        this.client = JSON.parse(sessionStorage.getItem('session'));
        this.getNotification()

        // shared notification length
        this.clientService.notificationLength$.subscribe(
            (res: any) => {
                if (res) {
                    this.getNotification()
                }

            }
        )
    }

    private getNotification() {
        this.clientService.getNotification(this.client._id).subscribe(
            (res: any) => {
                this.notifications = res.notifications
                const notificationsWith = res.notifications.filter(notification => notification.status === 0);
                this.notificationsLength = notificationsWith.length
            }
        )
    }

    navigate(id: number) {
        this.selectedTabIndex = id
    }


    openNotificationModal() {
        const dialog = this.dialog.open(NotificationComponent, {
            width: '400px',
            data: {
                notifications: this.notifications,
                length: this.notificationsLength
            }
        })
    }

    signOut() {
        this._authService.signOut();
        this._router.navigate(['sign-in']);
    }
}
