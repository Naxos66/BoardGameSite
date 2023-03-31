import { LocationsComponent } from './locations/locations.component';
import { FromulaireComponent } from './fromulaire/fromulaire.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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

const routes: Routes = [

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
    {
      path: 'locations',
      component: LocationsComponent,
    },
  {
    path: 'addLocation',
    component: FromulaireComponent,
  },
  {
    path: 'allMyLocations',
    component: ListeLocationsComponent,
  },
  {
    path: 'modifierLocation/:id',
    component: ModifierLocationComponent,
  }, {
    path: 'locationsAll',
    component: LocationsAllComponent,
  }, {
    path: 'liste-chats',
    component: ListeChatComponent,
  }, {
    path: 'chat/:id',
    component: ChatComponent,
  },
    {
      path: '**',
      redirectTo: 'login'
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
