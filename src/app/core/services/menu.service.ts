import { Injectable } from "@angular/core";
import { FuseNavigationItem } from "@fuse/components/navigation";

@Injectable({
    providedIn:'root'
})
export class MenuService {
    getAdminMenu(){
        const menu: FuseNavigationItem[] = 
        [
            {
                id   : 'employee',
                title: 'Employés',
                type : 'collapsable',
                icon : 'heroicons_outline:users',
                link : '/employee/list',
                children: [{
                    id   : 'employee-list',
                    title: 'Liste',
                    type : 'basic',
                    link : '/employee/list'
                    },
                    {
                    id   : 'employee-add',
                    title: 'Ajout',
                    type : 'basic',
                    link : '/employee/add'
                    }
                ]
            },
            {
                id   : 'service',
                title: 'Services',
                type : 'collapsable',
                icon : 'mat_outline:category',
                link : '/service/list',
                children: [{
                    id   : 'service-list',
                    title: 'Liste',
                    type : 'basic',
                    link : '/service/list'
                }]
            }
        ]
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