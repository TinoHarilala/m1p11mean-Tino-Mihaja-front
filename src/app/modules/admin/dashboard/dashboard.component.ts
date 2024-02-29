import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardService } from './dashboad.service';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        RouterLink,
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        NgIf,
        NgFor,
        NgClass,
        DatePipe,
        MatIconModule,
        DatePipe,
        MatExpansionModule,
        MatButtonToggleModule,
        FormsModule,
        NgApexchartsModule,
        MatTooltipModule,
    ],
    standalone: true,
    providers: [
        DatePipe,
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
    ],
    encapsulation: ViewEncapsulation.None,
    //  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements AfterViewInit {
    chartOptions: any
    chartReservation: any
    statDailyReservation: any
    chartChartDayTurnover: any
    selectedToggleValue: string = 'turnover';
    reservationObjectif = 10;
    reservationNbr: number = 11;
    turnoverValue: number = 200000;
    turnoverObjectif: number = 250000
    checkValue: boolean;
    checkTurnoverValue: boolean;
    statData = []
    dates = []
    isLoadingResults = false
    dataBenefit = []
    displayedColumns = ['revenu', 'depense', 'benefice', 'date']
    dateNow = new Date()

    constructor(
        private dashBoardService: DashboardService,
        private cdr: ChangeDetectorRef,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit() {
        // this.initalOptions();

    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.initStatTurnover()
            this.getBenefit()
            this.cdr.detectChanges();
            this.getStatDailyReservation();
            this.getStatDailyTurnover();
        });
    }

    private initChartDayTurnover(data, date){

        this.chartChartDayTurnover = {
            series: [
                {
                    name: "Chiffre d'\'affaire par jour",
                    data: data
                }
            ],
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75
                    }
                }
            },
            chart: {
                height: 350,
                type: "line",
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            colors: ['#64748B', '#94A3B8'],
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                    distributed: true
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                borderColor: 'var(--fuse-border)'
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: date,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    color: 'var(--fuse-border)'
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                labels: {
                    offsetX: -10,
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };
    }

    private initChartReservation(data, date) {
        this.chartReservation = {
            series: [
                {
                    name: "Nombre de résérvation",
                    data: data
                }
            ],
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75
                    }
                }
            },
            chart: {
                height: 350,
                type: "bar",
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            colors: [
                "#008FFB",
                "#00E396",
                "#FEB019",
                "#FF4560",
                "#775DD0",
                "#546E7A",
                "#26a69a",
                "#D10CE8"
              ],
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                    distributed: true
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                borderColor: 'var(--fuse-border)'
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: date,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    color: 'var(--fuse-border)'
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                labels: {
                    offsetX: -10,
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };
    }

    private initalOptions(data, date, label) {
        this.chartOptions = {
            series: [
                {
                    name: label,
                    data: data
                }
            ],
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75
                    }
                }
            },
            chart: {
                height: 350,
                type: "bar",
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            colors: ['#64748B', '#94A3B8'],
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                    distributed: true
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                borderColor: 'var(--fuse-border)'
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: date,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    color: 'var(--fuse-border)'
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                labels: {
                    offsetX: -10,
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };
    }

    private getStatDailyReservation() {
        this.dashBoardService.getStatDailyReservation().subscribe(
            (res: any) => {
                const count = res?.reservationParJourMois?.map(item => item?.count);
                const dates = res?.reservationParJourMois?.map(item => this.datePipe.transform(new Date(item?.date), 'dd MMM YYY'));
                this.initChartReservation(count, dates);
            }
        )
    }

    private getStatDailyTurnover(){
        this.dashBoardService.gettDayTurnover().subscribe(
            (res: any) => {
                console.log(res);
                
                const total = res?.chiffreAffaire?.map(item => item?.total);
                const dates = res?.chiffreAffaire?.map(item => this.datePipe.transform(new Date(item?.date), 'dd MMM YYY'));
                this.initChartDayTurnover(total, dates);
            }
        )
    }

    private initStatTurnover(label?: string) {
        this.dashBoardService.getStat().subscribe(
            (res: any) => {
                if (res && res.chiffreAffaire) {
                    const totalData = res?.chiffreAffaire?.map(item => item?.total);
                    const dates = res?.chiffreAffaire?.map(item => this.datePipe.transform(new Date(item?.date), 'dd MMM YYY'));

                    this.initalOptions(totalData, dates, label);
                }
            }
        );
    }

    private getStatReservation(label?: string) {
        this.dashBoardService.getStatReservation().subscribe(
            (res: any) => {
                if (res && res.reservationParJourMois) {
                    const totalData = res?.reservationParJourMois?.map(item => item?.count);
                    const dates = res?.reservationParJourMois?.map(item => item?.date);

                    this.initalOptions(totalData, dates, label);
                }
            }
        );
    }

    private getBenefit() {
        this.isLoadingResults = true
        this.dashBoardService.getBenefit().subscribe(
            (res: any) => {
                this.isLoadingResults = false
                this.dataBenefit = res.benefice
            }
        )
    }

    getReservationDifference(): number {
        const diff = this.reservationNbr - this.reservationObjectif;
        this.checkValue = diff > 0;
        return Math.abs(diff * 10);
    }

    getTurnoverDifference() {
        const diff = this.turnoverValue - this.turnoverObjectif;
        this.checkTurnoverValue = diff > 0;
        return Math.abs(diff * 100) / this.turnoverObjectif;
    }

    onToggleChange() {
        if (this.selectedToggleValue === 'turnover') {
            this.chartOptions.series = this.initStatTurnover('Chiffre d\'affaire')
        }
        else if (this.selectedToggleValue === 'reservation') {
            this.chartOptions.series = this.getStatReservation('Réservation')
        }
    }

    dateChange(event: any) {
        this.isLoadingResults = true;
        this.dataBenefit = [];
        this.dashBoardService.getBenefitDate(event.value.c.month, event.value.c.year).subscribe(
            (res: any) => {
                this.dataBenefit = res.benefice
                this.isLoadingResults = false;
            }
        )
    }

    resetTable() {
        this.getBenefit()
    }

}