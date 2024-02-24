import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    constructor(
        private http: HttpClient
    ) {
    }

    getList() {
        const url = [environment.apiUrl, 'get.depense'].join('/');
        return this.http.get(url);
    }

    getExpenseById(id): any{
        const url = [environment.apiUrl, 'depense', id].join('/');
        return this.http.get<any>(url);
    }

    getExpenseByDate(month: string, year: string){
        const url = [environment.apiUrl, `get.depense?mois=${month}&annee=${year}`].join('/');
        return this.http.get(url)
    }

    create(body:{montant: number, description: string}){
        const url = [environment.apiUrl, 'create.depense'].join('/');
        return this.http.post(url, body)
    }

    update(body:{montant: number, description: string}){
        const url = [environment.apiUrl, 'update.depense'].join('/');
        return this.http.post(url, body)
    }

    deleteExpense(id){
        const url = [environment.apiUrl, 'delete.depense', id].join('/');
        return this.http.get<any>(url)
    }
}
