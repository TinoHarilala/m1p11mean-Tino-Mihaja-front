import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceModel } from "app/core/model/service.model";
import { environment } from "environments/environment";

@Injectable({
    providedIn:'root'
})
export class Service {
    constructor(
        private http: HttpClient
    ){}

    getList(){
        const url = [environment.apiUrl, 'get.service'].join('/');
        return this.http.get<ServiceModel[]>(url);
    }
}