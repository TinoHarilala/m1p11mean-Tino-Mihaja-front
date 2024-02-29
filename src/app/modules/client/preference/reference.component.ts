import {Component, OnInit} from '@angular/core';
import {ClientService} from "../client.services";
import {NgForOf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AddModalComponent} from "./add-modal/add-modal.component";
import {MatDialog} from "@angular/material/dialog";
import { NotificationService } from 'app/core/services/notification.service';

@Component({
    selector: 'app-reference',
    standalone: true,
    templateUrl: './reference.component.html',
    imports: [
        NgForOf,
        MatButtonModule,
        MatIconModule
    ],
    styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit{

    preference : any[]
    constructor(
        private clientService: ClientService,
        private dialog: MatDialog,
        private notificationService: NotificationService
    ) {

    }
    ngOnInit() {
        this.getPreference()
    }

    getPreference(){
        this.clientService.getListReference().subscribe(res =>{
            this.preference = res.Preference
            console.log(this.preference)
        })
    }

    addPreference(){
        const dialogRef = this.dialog.open(AddModalComponent, {
            width: '500px',
            autoFocus: false
        })
        dialogRef.afterClosed().subscribe(result =>{
            this.getPreference()
        })
    }

    editReference(id){
        const dialogRef = this.dialog.open(AddModalComponent, {
            width: '500px',
            autoFocus: false
        })
        const component: AddModalComponent = dialogRef.componentInstance
        component.id = id
        dialogRef.afterClosed().subscribe(result =>{
            this.getPreference()
        })
    }

    deleteReference(id){
        this.clientService.deleteReference(id).subscribe(res=>{
            this.getPreference();
            this.notificationService.success('Suppression effectué avec succès')
        })
    }
}
