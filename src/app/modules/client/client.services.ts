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
}