import { Component } from '@angular/core';
import {FuseCardComponent} from "../../../../@fuse/components/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-actuality',
    templateUrl: './actuality.component.html',
    styleUrls: ['./actuality.component.scss'],
    imports: [
        FuseCardComponent,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        NgIf
    ],
    standalone: true
})
export class ActualityComponent {

}
