import { Routes } from "@angular/router";
import { ServiceListComponent } from "./service-list/service-list.component";

export default [
    {
      path: 'list',
      component: ServiceListComponent,
    }
  ] as Routes;