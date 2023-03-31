import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {Component, OnInit} from '@angular/core';
import {async, identity, Observable} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';


interface Location {
  prix: string;
  nom: string;
  description: string;
  disponible: boolean;
  photo: string;

  id:string
  idLoueur:string
}
interface LocationLouee {
  id_utilisateur: string;
  id_location: string;

}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {

  locationsCollection: AngularFirestoreCollection<Location>;
  locations!: Observable<Location[]>;

  constructor(private afs: AngularFirestore,private auth: AngularFireAuth) {
    this.locationsCollection = afs.collection<Location>('LOCATIONS');
    this.locations = this.locationsCollection.valueChanges({idField: 'id'})
  }
  louerLocation(locationId: string, loueurId:string, jeuName:string) {
    const user = this.auth.authState.subscribe(user => {
      if (user) {
        const louerDoc = this.afs.collection('LOUER').doc();
        louerDoc.set({id_locataire: user.uid, id_jeu: locationId, id_loueur: loueurId, jeuName: jeuName});
        const locationDoc = this.locationsCollection.doc(locationId);
        locationDoc.update({ disponible: false });
      }
    })
  }

}
