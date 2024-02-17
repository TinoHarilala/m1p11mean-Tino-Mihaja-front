import { Routes } from "@angular/router";
import { EmployeeAddComponent } from "./employee-add/employee-add.component";
import { EmployeeComponent } from "./employee-list/employee.component";

export default [
    {
      path: 'list',
      component: EmployeeComponent,
    },
    {
      path: 'add',
      component: EmployeeAddComponent,
    }
  ] as Routes;