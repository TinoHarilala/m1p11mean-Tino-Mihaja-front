import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { MenuService } from 'app/core/services/menu.service';
import { catchError, of, tap } from 'rxjs';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [RouterLink, FuseAlertComponent, NgIf, NgClass, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    toggle: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _menuService: MenuService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['sysadmin@gmail.com', [Validators.required, Validators.email]],
            password  : ['admin1234', Validators.required]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in 
        const inputValue = this.signInForm.getRawValue();
        
        const body = {
            "email": inputValue.email,
            "password": inputValue.password
        }

        this._authService.signIn(this.toggle ? 'login.employe' : 'login', body).pipe(
            tap((res)=>{
                this.showAlert = true;
                this.alert = {
                    type   : 'success',
                    message: 'Connection réussit',
                };
                this._authService.accessToken = res.token;
                this._authService.session = res?.client || res?.employe;
                if (this._authService.session?.isManager == 0) {
                    this._menuService.getEmployeeMenu() ;
                    this._router.navigateByUrl('/employee');
                }
                else {
                    this._menuService.getAdminMenu() ;
                    this._router.navigateByUrl('/admin');
                }
            }),
            catchError(error => {    
                this.showAlert = true        
                this.alert = {
                    type: 'error',
                    message: 'Erreur lors de la connexion',
                };

                return of(false); 
            })
        ).subscribe()
    }

    toggleButton(){
        this.toggle =  !this.toggle;
    }
}
