import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { TaskDoneComponent } from "./task-done/task-done.component";
import { TaskComponent } from "./task/task.component";

export default [
  {
    path: 'list',
    component: TaskComponent,
  },
  {
    path: 'done',
    component: TaskDoneComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  }
] as Routes;