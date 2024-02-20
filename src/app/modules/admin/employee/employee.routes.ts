import { Routes } from "@angular/router";
import { EmployeeAddComponent } from "./employee-add/employee-add.component";
import { EmployeeComponent } from "./employee-list/employee.component";
import { EmployeeDetailsComponent } from "./employee.details/employee-details.component";

export default [
    {
      path: 'list',
      component: EmployeeComponent,
    },
    {
      path: 'list/:id',
      component: EmployeeDetailsComponent,
    },
    {
      path: 'add',
      component: EmployeeAddComponent,
    }
  ] as Routes;