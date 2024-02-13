import { Component, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
    selector     : 'employee',
    standalone   : true,
    templateUrl  : './employee.component.html',
})
export class EmployeeComponent
{
    constructor(
        private employeeService: EmployeeService
    )
    {
    }
}