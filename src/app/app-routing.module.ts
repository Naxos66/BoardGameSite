import { LocationsComponent } from './locations/locations.component';
import { FromulaireComponent } from './fromulaire/fromulaire.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {ListeLocationsComponent} from "./liste-locations/liste-locations.component";
import {ModifierLocationComponent} from "./modifier-location/modifier-location.component";
import {LocationsAllComponent} from "./locations-all/locations-all.component";
import {ListeChatComponent} from "./liste-chat/liste-chat.component";
import {ChatComponent} from "./chat/chat.component";
import {DiscussionComponent} from "./discussion/discussion.component";
import {ListLocationsAdminComponent} from "./list-locations-admin/list-locations-admin.component";
import {
  ListLocationsEncoursAdminComponent
} from "./list-locations-encours-admin/list-locations-encours-admin.component";
import {ListeAdminComponent} from "./liste-admin/liste-admin.component";
import {AddAdminComponent} from "./add-admin/add-admin.component";


const routes: Routes = [
  // Routes pour l'authentification avec Nebular
  {
    path: '',
    component: NbLoginComponent
  },
  {
    path: 'login',
    component: NbLoginComponent,
  },
  {
    path: 'register',
    component: NbRegisterComponent,
  },
  {
    path: 'logout',
    component: NbLogoutComponent,
  },
  {
    path: 'request-password',
    component: NbRequestPasswordComponent,
  },
  {
    path: 'reset-password',
    component: NbResetPasswordComponent,
  },

  // Routes pour les fonctionnalités de l'application
  {
    path: 'locations',
    component: LocationsComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'addLocation',
    component: FromulaireComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'allMyLocations',
    component: ListeLocationsComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'modifierLocation/:id',
    component: ModifierLocationComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'locationsAll',
    component: LocationsAllComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'locationsAllAdmin',
    component: ListLocationsAdminComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'locationsEnCoursAdmin',
    component: ListLocationsEncoursAdminComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'liste-chats',
    component: ListeChatComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'listeAdmin',
    component: ListeAdminComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'addAdmin',
    component: AddAdminComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  // {
  //   path: 'liste-chats-admin',
  //   component: ListChatAdminComponent,
  //   canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  // },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: 'discussion/:idClient/:idJeu/:idLoueur',
    component: DiscussionComponent,
    canActivate: [AuthGuard] // Route protégée par le garde de navigation AuthGuard
  },
  {
    path: '**',
    redirectTo: 'login' // Redirection vers la page de connexion pour toutes les autres routes non définies
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
