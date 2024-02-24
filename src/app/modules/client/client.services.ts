import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
    providedIn:"root"
})
export class ClientService {
    constructor(
        private http: HttpClient
    ){}

    getService(){
       const url = [environment.apiUrl, 'get.service'].join('/');
       return this.http.get(url); 
    }

    getOffer(){
       const url = [environment.apiUrl, 'get.offreSpecial'].join('/');
        return this.http.get(url);
    }

    makeAnAppointment(body: {idClient: string, dateTime: string, service: string}){
        const url = [environment.apiUrl, 'client.rendezVous'].join('/');
        return this.http.post(url, body)
    }

    unavailability(body){
        const url = [environment.apiUrl, 'indisponibilite'].join('/');
        return this.http.post(url, body)
    }
}