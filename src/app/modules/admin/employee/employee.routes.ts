import { Routes } from "@angular/router";
import { EmployeeComponent } from "./employee-list/employee.component";

export default [
    {
      path: 'list',
      component: EmployeeComponent,
    }
  ] as Routes;