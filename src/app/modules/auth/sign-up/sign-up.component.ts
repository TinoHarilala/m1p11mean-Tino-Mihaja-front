import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { verifyPassword } from 'app/core/shared/verify-password.directive';
import { catchError, of, tap } from 'rxjs';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
    ],
    imports: [RouterLink, NgIf, MatDatepickerModule, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
            this.initForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // ---------------------------------------------------------------------------------------------
    private initForm() {
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            date_of_birth: ['', Validators.required],
            contact: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4)]],
            confirm_password: ['', Validators.required],
        }, { validator: verifyPassword }
        );

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        const inputValue = this.signUpForm.getRawValue()

        const body = {
            nom: inputValue.name,
            email: inputValue.email,
            dateNaissance: inputValue.date_of_birth,
            contact: inputValue.contact,
            password: inputValue.password,
            solde: 100000
        }

        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Hide the alert
        this.showAlert = false;

        // Sign up        

        this._authService.signUp(body).pipe(
            tap(() => {
                this.showAlert = true;
                this.alert = {
                    type: 'success',
                    message: 'La création de votre compte a été effectuée avec succès.',
                };
                this._router.navigateByUrl('/sign-in');
            }),
            catchError(error => {
                if (error) {
                    this.showAlert = true;
                    this.alert = {
                        type: 'error',
                        message: 'Une erreur s\'est produite. Veuillez réessayer',
                    };
                }
                return of(null);
            })
        ).subscribe();

    }
}
