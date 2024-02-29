import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from "../../client.services";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {DialogRef} from "@angular/cdk/dialog";
import {MatSelectModule} from "@angular/material/select";
import {AdminService} from "../../../admin/admin.services";
import {Service} from "../../../admin/service/service.service";
import { NotificationService } from 'app/core/services/notification.service';

@Component({
    selector: 'app-add-modal',
    standalone: true,
    templateUrl: './add-modal.component.html',
    imports: [
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
        MatSelectModule,
        NgForOf
    ],
    styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
    @Input() id: number
    preferenceForm: FormGroup
    user: any;
    employe: any[];
    services: any[];

    constructor(
        private clientService: ClientService,
        private fb: FormBuilder,
        private modalRef: DialogRef,
        private service: Service,
        private adminService: AdminService,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.initForm()
        this.user = JSON.parse(sessionStorage.getItem('session'))
        this.preferenceForm.patchValue({
            idClient: this.user ? this.user._id : null,
        })
        this.getEmployee();
        this.getService();
        if (this.id) {
            this.getReferenceById(this.id)
        }
    }

    private getService() {
        this.service.getList().subscribe(
            (res: any) => {
                this.services = res.service
            }
        )
    }

    getReferenceById(id){
        this.clientService.getReferenceById(id).subscribe(res=>{
            console.log(res)
            this.preferenceForm.patchValue({
                employe: res.Preference.employe._id,
                service: res.Preference.service._id,
            })
        })
    }

    private getEmployee() {
        this.adminService.getEmployeeList().subscribe(
            (res: any) => {
                this.employe = res.employe
            }
        );
    }

    initForm() {
        this.preferenceForm = this.fb.group({
            idClient: this.user ? this.user._id : null,
            employe: null,
            service: null,
            isDeleted: 0
        })
    }

    save() {
        const body = this.preferenceForm.getRawValue()
        this.clientService.createReference(body).subscribe(res => {
            this.modalRef.close(true)
            this.notificationService.success('Enregistrement effectuée avec succès')
        })
    }

    editReference() {
        const body = this.preferenceForm.getRawValue()
        this.clientService.updateReference(body).subscribe(res => {
            this.modalRef.close(true)
        })
    }

}
