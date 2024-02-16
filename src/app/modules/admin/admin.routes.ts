import { Routes } from "@angular/router";
import { AdminComonent } from "./admin.component";

export default [
    {path: 'employee', loadChildren: () => import('app/modules/admin/employee/employee.routes')},
    {path: 'service', loadChildren: () => import('app/modules/admin/service/service.routes')},
    {path: 'admin', component: AdminComonent}

  ] as Routes;