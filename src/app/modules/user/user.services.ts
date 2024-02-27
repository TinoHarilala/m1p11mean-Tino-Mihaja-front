import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "app/core/model/user.model";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    getTaskDoneList(id_employee: string) {
        const url = [environment.apiUrl, 'suivi.task.done', id_employee].join('/');
        return this.http.get(url);
    }

    getTask(id_employee: string) {
        const url = [environment.apiUrl, 'employe.rendezVous', id_employee].join('/');
        return this.http.get(url);
    }

    getActualyCommission(id_employee: string, date: string){
        const url = [environment.apiUrl, 'suivi.commission', id_employee, date].join('/');
        return this.http.get(url)
    }

    getUserById(id: string){
        const url = [environment.apiUrl, 'employe', id].join('/');
        return this.http.get(url)
    }

    updateTaskStatus(id: string) {
        const url = [environment.apiUrl, 'done', id].join('/');
        return this.http.get(url);
    }

    updateProfile(body:any){
        const url = [environment.apiUrl, 'update.employe'].join('/');
        return this.http.post(url, body);
    }
}