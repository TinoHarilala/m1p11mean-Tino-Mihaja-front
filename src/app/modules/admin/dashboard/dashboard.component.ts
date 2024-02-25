import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import {  NgApexchartsModule } from 'ng-apexcharts';
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
        DatePipe,
        MatIconModule,
        DatePipe,
        MatExpansionModule,
        MatButtonToggleModule,
        FormsModule,
        NgApexchartsModule,
        MatTooltipModule,
    ],
    standalone: true
})
export class DashboardComponent {
    chartOptions: any;
    selectedToggleValue: string = 'turnover';
    reservationObjectif = 10;
    reservationNbr: number = 11;
    turnoverValue: number = 200000;
    turnoverObjectif: number = 250000
    checkValue: boolean;
    checkTurnoverValue: boolean;

    constructor(
        private dashBoardService: DashboardService
    ) { }

    ngOnInit() {
        this.initalOptions();
    }
    private initalOptions(){
        this.chartOptions = {
            series: [
                {
                    name: "Chiffre d'affaire",
                    data: [900000, 3000000, 560000, 650000, 762000, 846200, 1000000, 2000000, 456200, 950000, 652000, 760300]
                }
            ],
            states     : {
                hover: {
                    filter: {
                        type : 'darken',
                        value: 0.75
                    }
                }
            },
            chart: {
                height: 350,
                type: "bar",
            },
            colors: ['#64748B', '#94A3B8'],
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                     distributed: true
                }
            },
            dataLabels: {
                enabled: false,
                enabledOnSeries: [0],
                background: {
                    borderWidth: 0
                }
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            grid: {
                borderColor: 'var(--fuse-border)'
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: [
                    "Janvier",
                    "Fevrier",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Decembre"
                ],
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
            yaxis      : {
                labels: {
                    offsetX: -10,
                    style  : {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };
    }

    getReservationDifference(): number {
        const diff = this.reservationNbr - this.reservationObjectif;
        this.checkValue = diff > 0;
        return Math.abs(diff * 10);
    }

    getTurnoverDifference(){
        const diff = this.turnoverValue - this.turnoverObjectif;
        this.checkTurnoverValue = diff > 0;
        return Math.abs(diff *100 ) / this.turnoverObjectif;
    }

    onToggleChange() {
    if (this.selectedToggleValue === 'turnover') {
        this.chartOptions.series = this.dashBoardService.getTurnover()
      }
    else if (this.selectedToggleValue === 'reservation') {
        this.chartOptions.series = this.dashBoardService.getReservation()
      }
    }

    
}