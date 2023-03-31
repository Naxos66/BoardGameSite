import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login() {
    // Appeler un service pour s'authentifier
    this.loggedIn = true;
  }

  logout() {
    // Appeler un service pour se déconnecter
    this.loggedIn = false;
  }
}
