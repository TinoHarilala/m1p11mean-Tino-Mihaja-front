import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLink, RouterOutlet } from "@angular/router";
import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FullCalendarComponent, FullCalendarModule } from "@fullcalendar/angular";
import { ClientService } from '../client.services';
import { Client } from 'app/core/model/client.model';
import { MatButtonModule } from '@angular/material/button';
import { OfferModel } from 'app/core/model/offer.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, of, tap } from 'rxjs';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from 'app/core/services/notification.service';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    imports: [
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,

        RouterLink,
        RouterOutlet,
        NgIf,
        NgFor,
        NgClass,
        DatePipe,
        FullCalendarModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,

    ],
    standalone: true,
    providers: [DatePipe,
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
    ],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {

    currentView: string = 'timeGridWeek';
    selectedHours: string;
    client: Client;
    unavailabilityDate = [];
    dateInfo: any;
    offers: OfferModel[] = [];
    isLoading: boolean = false;
    idSelectedSpecialOffer: string;
    selectedOfferId: string | null = null;
    amountForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CalendarComponent>,
        private clientService: ClientService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private datePipe: DatePipe,
        private formBuilder: FormBuilder,
        private notificationSerivce: NotificationService
    ) { }

    calendarOptions: CalendarOptions = {
        plugins: [
            interactionPlugin,
            dayGridPlugin,
            timeGridPlugin,
        ],
        businessHours: {
            startTime: '07:00',
            endTime: '18:00'
        },
        initialDate: new Date(),
        validRange: {
            start: new Date(),
        },

        slotMinTime: '08:00',
        slotMaxTime: '18:00',
        nowIndicator: true,
        locale: frLocale,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek'
        },
        initialView: 'timeGridWeek',
        allDaySlot: false,
        weekends: true,
        timeZone: 'utc',
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        slotEventOverlap: false,
        select: this.handleDateSelect.bind(this),
        datesSet: this.handleDatesSet.bind(this),
    };

    ngOnInit() {
        import('@fullcalendar/core/locales/fr').then((fr) => {
            this.calendarOptions.locale = fr.default;
        });
        this.client = JSON.parse(sessionStorage.getItem('session'));
        this.getUnavailability();
       
    }

    private getUnavailability() {
        this.clientService.unavailability({ '_id': this.data?._id }).subscribe((res: any) => {
            this.unavailabilityDate = res.indisponibilite;
        });
    }

    private getSpecialOffer(date: string, id_service: string) {
        this.isLoading = true

        this.clientService.getSpecialOffer(date, id_service).subscribe(
            (res: any) => {
                this.isLoading = false
                this.offers = res.OffreSpecial
            }
        )
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        var startDateTime = new Date(selectInfo.start);
        var endDateTime = new Date(startDateTime.getTime() + this.data.duree * 60 * 60 * 1000);
        var endStr = endDateTime.toISOString();

        this.dateInfo = {
            start: this.datePipe.transform(selectInfo.start, 'yyyy-MM-dd HH:mm:ss', 'UTC'),
            end: this.datePipe.transform(endStr, 'yyyy-MM-dd HH:mm:ss', 'UTC'),
        };

        this.selectedHours = this.dateInfo.start;
        selectInfo.view.calendar.removeAllEvents();
        selectInfo.view.calendar.addEvent(this.dateInfo);
        selectInfo.view.calendar.refetchEvents();

        this.getSpecialOffer(selectInfo.start.toISOString(), this.data._id);

    }

    save() {
        const body = { idClient: this.client._id, dateTime: this.selectedHours, service: this.data._id }
        const resultWithOffer = {
            "rendezVous": body,
            "offreSpecial": this.idSelectedSpecialOffer,
        };

        this.clientService.makeAnAppointment(this.idSelectedSpecialOffer ? resultWithOffer : { "rendezVous": body }).pipe(
            tap(() => {
                this.notificationSerivce.success('Réservation effectuée avec succès, merci')
                this.dialogRef.close(true);
            }),
            catchError(err => {
                this.notificationSerivce.error(err.error.error)
                return of(null)
            })
        ).subscribe()

    }



    handleDatesSet(info) {
        const calendarApi = info.view.calendar;

        const selectConstraints = this.unavailabilityDate.map(indisponibilite => ({
            start: new Date(indisponibilite.startTime),
            end: new Date(indisponibilite.endTime)
        }));

        calendarApi.setOption('selectAllow', (selectInfo) => {
            const selectedStart = selectInfo.start;
            const selectedEnd = selectInfo.end;

            return selectConstraints.every(constraint => {
                return selectedEnd <= constraint.start || selectedStart >= constraint.end;
            });
        });
    }

    setSpecialOffer(id: string) {        
        this.idSelectedSpecialOffer = id
                
    }


}