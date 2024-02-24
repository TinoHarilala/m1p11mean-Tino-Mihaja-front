import { Routes } from "@angular/router";
import {ExpenseComponent} from "./expense-list/expense.component";

export default [
    {
        path: 'list',
        component: ExpenseComponent
    }
] as Routes;
