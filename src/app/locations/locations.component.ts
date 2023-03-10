import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

interface Location {
  prix: string;
  nom: string;
  description: string;
  disponible: boolean;
  photo: string;
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {

  locationsCollection: AngularFirestoreCollection<Location>;
  locations: Observable<Location[]>;

  constructor(private afs: AngularFirestore) {
    this.locationsCollection = afs.collection<Location>('LOCATIONS');
    this.locations = this.locationsCollection.valueChanges();
  }

}
