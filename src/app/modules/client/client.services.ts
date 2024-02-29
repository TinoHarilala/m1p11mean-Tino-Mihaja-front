import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { StringChain } from "lodash";
import { Subject } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class ClientService {
    private notificationLength = new Subject<boolean>()
    notificationLength$ = this.notificationLength.asObservable()

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

    makeAnAppointment(body: any){
        const url = [environment.apiUrl, 'client.rendezVous'].join('/');
        return this.http.post(url, body)
    }

    payment(body){
        const url = [environment.apiUrl, 'paiement.rendezVous'].join('/');
        return this.http.post(url, body)
    }

    unavailability(body){
        const url = [environment.apiUrl, 'indisponibilite'].join('/');
        return this.http.post(url, body)
    }

    createReference(body){
        const url = [environment.apiUrl, 'create.preference'].join('/');
        return this.http.post(url, body)
    }

    getListReference(){
        const url = [environment.apiUrl, 'get.preference'].join('/');
        return this.http.get<any>(url);
    }

    getReferenceById(id){
        const url = [environment.apiUrl, 'preference', id].join('/');
        return this.http.get<any>(url)
    }


    updateReference(body){
        const url = [environment.apiUrl, 'update.preference'].join('/');
        return this.http.post(url, body)
    }

    deleteReference(id){
        const url = [environment.apiUrl, 'delete.preference', id].join('/');
        return this.http.get(url)
    }

    getSpecialOffer(date: string, id_service: string) {
        const url = [environment.apiUrl, 'valide.offreSpecial', date, id_service].join('/');
        return this.http.get(url);
    }

    getHistories(id_client: StringChain){
        const url = [environment.apiUrl, 'historique', id_client].join('/');
        return this.http.get(url)
    }

    getDetailHistory(idHistory: string, idClient){
        const url = [environment.apiUrl, 'paiement.rendezVous', idHistory, idClient].join('/');
        return this.http.get(url)
    }

    getNotification(id_client: string){
        const url = [environment.apiUrl, 'get.notification', id_client].join('/');
        return this.http.get(url)
    }

    sharedNotificationLength(status: boolean){
        this.notificationLength.next(status)
    }

    updateNotificationStatus(id: string){
        const url = [environment.apiUrl, 'update', id].join('/');
        return this.http.get(url)

    }
}