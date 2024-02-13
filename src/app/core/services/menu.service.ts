import { Injectable } from "@angular/core";
import { FuseNavigationItem } from "@fuse/components/navigation";

@Injectable({
    providedIn:'root'
})
export class MenuService {
    getAdminMenu(){
        const menu: FuseNavigationItem[] = [{
            id   : 'offer',
            title: 'Offre',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/offer'
        }]
        return menu
    }

    getEmployeeMenu() {
        const menu: FuseNavigationItem[] = [{
            id   : 'example',
            title: 'example',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/example'
        }]
        return menu
    }
}