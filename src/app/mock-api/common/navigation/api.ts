import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { AuthService } from 'app/core/auth/auth.service';
import { User } from 'app/core/model/user.model';
import { MenuService } from 'app/core/services/menu.service';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';
import { Subscription } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NavigationMockApi
{
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private _defaultNavigation: FuseNavigationItem[];
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    subscription = new Subscription();
    userConnected: User;

    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _authService: AuthService,
        private menuService: MenuService
        )
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------

        this.subscription.add(
            this._authService.$getUserConnected.subscribe((res)=>{
                if (res) {
                    this._defaultNavigation = res;
                    sessionStorage.setItem('active_menu', JSON.stringify(res))
                }
            })
        )

        if(!this._defaultNavigation){
            this._defaultNavigation = JSON.parse(sessionStorage.getItem('active_menu'));
        }

        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() =>
            {
                // Fill compact navigation children using the default navigation
                this._compactNavigation.forEach((compactNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill futuristic navigation children using the default navigation
                this._futuristicNavigation.forEach((futuristicNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if ( defaultNavItem.id === futuristicNavItem.id )
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Return the response
                return [
                    200,
                    {
                        compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(this._defaultNavigation),
                        futuristic: cloneDeep(this._futuristicNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation),
                    },
                ];
            });
    }
}
