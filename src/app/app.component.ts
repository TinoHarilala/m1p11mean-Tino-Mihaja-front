import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
      constructor(private router: Router) {}

        ngOnInit() {
            // Naviguer vers la page de connexion au chargement initial de l'application
            this.router.navigate(['/sign-in']);
        }
}
