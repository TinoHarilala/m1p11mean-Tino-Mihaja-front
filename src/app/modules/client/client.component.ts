import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { DatePipe, NgIf } from "@angular/common";
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
import Swal from 'sweetalert2';

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
    providers: [DatePipe],
    standalone: true
})
export class ClientComponent {
    selectedTabIndex: number = 0;
    client: Client;
    notificationsLength: number;
    notifications: any[] = [];
    histories: any;


    constructor(
        private _authService: AuthService,
        private _router: Router,
        private dialog: MatDialog,
        private clientService: ClientService,
        private datePipe: DatePipe

    ) { }

    ngOnInit() {
        this.client = JSON.parse(sessionStorage.getItem('session'));
        this.getNotification();
        this.getHistories();

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

    getHistories() {
        const user = JSON.parse(sessionStorage.getItem('session'));
        this.clientService.getHistories(user?._id).subscribe(
            (res: any) => {
                this.histories = res.historique
                this.checkDates()
            }
        )
    }
    private async checkDates() {
        for (const offre of this.histories) {
            await this.checkDateAndShowAlert(offre);
        }
    }

    private async checkDateAndShowAlert(offre: any): Promise<void> {
        const currentDate = new Date();
        const twoDaysLater = new Date(currentDate);
        twoDaysLater.setDate(currentDate.getDate() + 2);

        const serverDate = new Date(offre.dateTime);

        if (serverDate.getTime() >= currentDate.getTime() && serverDate.getTime() <= twoDaysLater.getTime()) {
            await this.showAlert('Vous avez un rendez-vous le ' + this.datePipe.transform(offre?.dateTime, 'dd MMM YYYY : hh:mm' ) + ' service : ' + offre?.service?.nom );
        }
    }

    private showAlert(message: string): Promise<any> {
        return Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            animation: false,
            timer: 4000,
            width: 'auto',
            color: '#4F46E5',
            text: message,
            customClass: {
                popup: 'bg-indigo-50',
            },
            didRender(toast: HTMLElement) {
                toast.addEventListener('click', () => {
                    Swal.close();
                });
            }
        })
        .then()
    }
}
