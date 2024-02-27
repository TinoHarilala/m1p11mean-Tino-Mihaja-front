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
                id   : 'dashboad',
                title: 'Tableau de bord',
                type : 'basic',
                icon : 'mat_outline:dashboard',
                link : '/dashboard/list'
            },
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
            },
            {
                id   : 'expense',
                title: 'Dépenses',
                type : 'basic',
                icon : 'heroicons_outline:banknotes',
                link : '/expense/list',
            },
            {
                id   : 'offer',
                title: 'Offres',
                type : 'basic',
                icon : 'mat_outline:local_offer',
                link : '/offer/list',
            }
        ]
        return menu
    }

    getEmployeeMenu() {
        const menu: FuseNavigationItem[] = [
            {
                id   : 'profile',
                title: 'Profile',
                type : 'basic',
                icon : 'heroicons_outline:user',
                link : '/task/profile'
            },
            {
                id   : 'task',
                title: 'Tâches',
                type : 'basic',
                icon : 'mat_outline:task_alt',
                link : '/task/list'
            },
            {
                id   : 'taskDone',
                title: 'Rendez-vous',
                type : 'basic',
                icon : 'mat_outline:list_alt',
                link : '/task/done'
            }
    ]
        return menu
    }
}