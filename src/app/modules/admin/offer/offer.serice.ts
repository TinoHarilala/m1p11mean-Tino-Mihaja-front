import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OfferModel } from "app/core/model/offer.model";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OfferService {
    constructor(
        private http: HttpClient
    ) { }

    getOfferList() {
        const url = [environment.apiUrl, 'get.offreSpecial'].join('/');
        return this.http.get(url);
    }

    createOffer(body: OfferModel) {
        const url = [environment.apiUrl, 'create.offreSpecial'].join('/');
        return this.http.post(url, body)
    }

    deleteOffer(idOffer: string) {
        const url = [environment.apiUrl, 'delete.offreSpecial', idOffer].join('/');
        return this.http.get(url);
    }

    updateOffer(body: OfferModel) {
        const url = [environment.apiUrl, 'update.offreSpecial'].join('/');
        return this.http.post(url, body)
    }   
}