import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth'; // Import du service NbAuthService du module Nebular
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated() // Vérification de l'authentification en utilisant le service NbAuthService
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/login']); // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
          }
        }),
        map(authenticated => !!authenticated) // Conversion du résultat en un booléen (true si authentifié, false sinon)
      );
  }

}
