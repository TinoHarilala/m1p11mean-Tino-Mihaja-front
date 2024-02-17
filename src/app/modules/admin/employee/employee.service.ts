import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(
        private http: HttpClient
    ) { }

    getList() {
        const url = [environment.apiUrl, 'get.employe'].join('/');
        return this.http.get(url);
    }

    add(body: any) {
        const url = [environment.apiUrl, 'registration.employe'].join('/');
        return this.http.post(url, body);
    }
}