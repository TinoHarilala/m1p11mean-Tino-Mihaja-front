import { Injectable } from "@angular/core";
import { DateTime } from "luxon";
import { ApexAxisChartSeries } from "ng-apexcharts";

export const dataSeriesTurnover = [
    {
        name: "Chiffre d'affaire",
        data: [900000, 3000000, 560000, 650000, 762000, 846200, 1000000, 2000000, 456200, 950000, 652000, 760300]
    }
]

export const dataSeriesReservation = [
    {
        name: "Reservation",
        data: [200, 520, 410, 632, 210, 602, 102, 510, 450, 320, 120, 410]
    }
]
@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(
    ) { }

    getTurnover() {
        return dataSeriesTurnover
    }

    getReservation() {
        return dataSeriesReservation
    }
}