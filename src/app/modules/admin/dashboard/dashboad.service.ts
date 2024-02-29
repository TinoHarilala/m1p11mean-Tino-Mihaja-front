import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
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
        private http: HttpClient
    ) { }

    getTurnover() {
        return dataSeriesTurnover
    }

    getReservation() {
        return dataSeriesReservation
    }

    getStat(){
        const url = [environment.apiUrl, 'statistique.chiffreAffaireMois'].join('/');
        return this.http.get(url);
    }

    getStatReservation(){
        const url = [environment.apiUrl, 'statistique.reservationMois'].join('/');
        return this.http.get(url);
    }

    getBenefit(){
        const url = [environment.apiUrl, 'statistique.benefice'].join('/');
        return this.http.get(url);
    }

    getBenefitDate(month, year){
        const url = [environment.apiUrl, `statistique.benefice?mois=${month}&annee=${year}`].join('/');
        return this.http.get(url)
    }

    getStatDailyReservation(){
        const url = [environment.apiUrl, 'statistique.reservation'].join('/');
        return this.http.get(url);
    }

    gettDayTurnover(){
        const url = [environment.apiUrl, 'statistique.chiffreAffaire'].join('/');
        return this.http.get(url);
    }
}