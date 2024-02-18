import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { ServiceModel } from "app/core/model/service.model";
import { Service } from "../service.service";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from "@angular/material/dialog";
import { ServiceAddComponent } from "../service-add/service-add.component";

@Component({
    selector: 'service',
    standalone: true,
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
    imports: [
        MatTableModule,
        RouterLink,
        MatIconModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        NgIf,
        NgFor
    ]
})
export class ServiceListComponent implements OnInit {
    services: ServiceModel[] = [];

    constructor(
        private service: Service,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getService();
    }

    private getService() {
        this.service.getList().subscribe(
            (res: any) => {
                this.services = res.service
            }
        )
    }

    openAddServiceModal() {
        const dialogRef = this.dialog.open(ServiceAddComponent, {
            autoFocus: false,
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(item => {
            this.getService();
        });
    }
}