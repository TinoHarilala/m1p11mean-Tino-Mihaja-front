import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { User } from "app/core/model/user.model";
import { EmployeeService } from "../employee.service";
import { NgFor, NgIf } from "@angular/common";
import { DatePipe } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector       : 'employee-details',
    templateUrl    : './employee-details.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        NgIf,
        NgFor,
        DatePipe
    ]
})
export class EmployeeDetailsComponent{
    @Input() employeeSelected: User;
    @Output() newItemEvent = new EventEmitter<boolean>();
    employee: User;

    constructor(
        private employeeService: EmployeeService
    ){
        
    }

    ngOnInit(){
        console.log(this.employeeSelected);
        this.employeeService.$employee.subscribe(
            (res)=>{
                this.employee = res
            }
        )
    }

    close() {        
        this.newItemEvent.emit(true);
      }
}