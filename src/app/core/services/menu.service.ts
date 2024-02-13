import { Injectable } from "@angular/core";
import { FuseNavigationItem } from "@fuse/components/navigation";

@Injectable({
    providedIn:'root'
})
export class MenuService {
    getAdminMenu(){
        const menu: FuseNavigationItem[] = [{
            id   : 'employee',
            title: 'Employés',
            type : 'collapsable',
            icon : 'heroicons_outline:user',
            link : '/employee/list',
            children: [{
                id   : 'employee-list',
                title: 'Liste',
                type : 'basic',
                link : '/employee/list'
            }]
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