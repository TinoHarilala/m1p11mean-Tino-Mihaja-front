import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { catchError, Observable, of, Subject, switchMap, throwError } from 'rxjs';
import { Client } from '../model/client.model';
import { User } from '../model/user.model';
import { UserService } from '../user/user.service';
import { AuthUtils } from './auth.utils';

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;
    private apiUrl = environment.apiUrl;
    private getUserConnected = new Subject<any>();
    public $getUserConnected = this.getUserConnected.asObservable();
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        sessionStorage.setItem('token', token);
    }

    get accessToken(): string
    {
        return sessionStorage.getItem('token') ?? '';
    }

    /**
     * Setter & getter for session
     */

     set session(session: User)
     {
         sessionStorage.setItem('session', JSON.stringify(session));
     }
 
     get session(): User | null {
        const storedSession = sessionStorage.getItem('session');
        return storedSession ? JSON.parse(storedSession) : null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(urlSegment: 'login' | 'login.employe', credentials: { email: string; password: string }): Observable<any>
    {
        const url = [this.apiUrl , urlSegment].join('/');

        return this._httpClient.post(url, credentials).pipe(
            switchMap((response: any) =>
            {
                // Store the access token in the local storage
                this.accessToken = response;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                //this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            }),
        );
    }


    /**
     * Sign in using the access token
     */
     signInUsingToken(): Observable<any>
     {
         // Sign in using the token
         return this._httpClient.post('api/auth/sign-in-with-token', {
             accessToken: this.accessToken,
         }).pipe(
             catchError(() =>
 
                 // Return false
                 of(false),
             ),
             switchMap((response: any) =>
             {
                 // Replace the access token with the new one if it's available on
                 // the response object.
                 //
                 // This is an added optional step for better security. Once you sign
                 // in using the token, you should generate a new one on the server
                 // side and attach it to the response object. Then the following
                 // piece of code can replace the token with the refreshed one.
                 if ( response.accessToken )
                 {
                     this.accessToken = response.accessToken;
                 }
 
                 // Set the authenticated flag to true
                 this._authenticated = true;
 
                 // Store the user on the user service
                 this._userService.user = response.user;
 
                 // Return true
                 return of(true);
             }),
         );
     }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        sessionStorage.removeItem('token');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    sharedActiveMenu(menu: FuseNavigationItem[]) {
        this.getUserConnected.next(menu);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: Client): Observable<any>
    {
        const url = [this.apiUrl, 'registration'].join('/');
        return this._httpClient.post(url, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
     check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
