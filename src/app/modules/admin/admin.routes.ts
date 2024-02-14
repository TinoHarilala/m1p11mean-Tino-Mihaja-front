import { Routes } from "@angular/router";
import { EmployeeComponent } from "./employee/employee-list/employee.component";

export default [
    {
      path: 'employee/list',
      component: EmployeeComponent,
    }
  ] as Routes;