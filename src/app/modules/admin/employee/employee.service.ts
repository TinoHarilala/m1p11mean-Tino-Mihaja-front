import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "app/core/model/user.model";
import { environment } from "environments/environment";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private sharedDataEmployee = new Subject<User>();
    $employee = this.sharedDataEmployee.asObservable();

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

    sharedEmployee(employee: User){
        this.sharedDataEmployee.next(employee);
    }

    search(nom: string){
        const url = [environment.apiUrl, 'get.employe?nom='+ nom].join('/')
        return this.http.get<any>(url)
    }
}