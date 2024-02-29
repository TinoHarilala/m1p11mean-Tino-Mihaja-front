import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
    providedIn:'root'
})
export class AdminService {
    constructor(
        private http: HttpClient
    ){}

    getEmployeeList(){
        const url = [environment.apiUrl, 'get.employe'].join('/');
        return this.http.get(url);
    }
}
