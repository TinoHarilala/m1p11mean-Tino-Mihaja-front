import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';
import { Observable, of, Subject, switchMap, throwError } from 'rxjs';
import { Client } from '../model/client.model';
import { User } from '../model/user.model';

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
        if(this.accessToken) {
                    }
        return of(true)
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
    check(): Observable<boolean>
    {
        return of(!!this.accessToken);
    }

    sharedActiveMenu(menu: FuseNavigationItem[]) {
        this.getUserConnected.next(menu);
    }
}
