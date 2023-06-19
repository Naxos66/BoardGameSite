import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-list-locations-encours-admin',
  templateUrl: './list-locations-encours-admin.component.html',
  styleUrls: ['./list-locations-encours-admin.component.scss']
})
export class ListLocationsEncoursAdminComponent implements OnInit {

  AllLocations: any[] = [];

  constructor(private firestore: AngularFirestore,private afAuth: AngularFireAuth)  { }

  ngOnInit(): void {
    const user = this.afAuth.authState.subscribe(user => {
      if(user) {
        this.firestore.collection('LOUER').valueChanges({idField: 'id'})
          .subscribe((locations: any) => {
            this.AllLocations = locations;
          });
      }})
  }
  validerLocation(idLocation:string, idLouer:string) {
    this.firestore.collection('LOUER').doc(idLouer).delete();
    const locationRef = this.firestore.collection('LOCATIONS').doc(idLocation);
    locationRef.update({ disponible: true });
  }

}
