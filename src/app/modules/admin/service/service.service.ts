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

    create(body: any){
        const url = [environment.apiUrl, 'create.service'].join('/');
        return this.http.post(url, body);
    }

    delete(id){
        const url = [environment.apiUrl, 'delete.service',id].join('/');
        return this.http.get<ServiceModel[]>(url);
    }

    update(body: ServiceModel){
        const url = [environment.apiUrl, 'update.service'].join('/');
        return this.http.post(url, body);
    }

    getById(id){
        const url = [environment.apiUrl, 'service', id].join('/');
        return this.http.get<any>(url);
    }

    search(nom: string){
        const url = [environment.apiUrl, 'get.service?nom='+ nom].join('/')
        return this.http.get<any>(url)
    }
}