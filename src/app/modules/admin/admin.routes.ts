import { Routes } from "@angular/router";

export default [
    {path: 'employee', loadChildren: () => import('app/modules/admin/employee/employee.routes')},
    {path: 'service', loadChildren: () => import('app/modules/admin/service/service.routes')},

  ] as Routes;