import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-locations-all',
  templateUrl: './locations-all.component.html',
  styleUrls: ['./locations-all.component.scss']
})
export class LocationsAllComponent implements OnInit {
  mesLocations: any[] = [];
  locations: any[] = [];

  constructor(private firestore: AngularFirestore,private afAuth: AngularFireAuth)  { }

  ngOnInit(): void {
    const user = this.afAuth.authState.subscribe(user => {
      if(user) {
        this.firestore.collection('LOUER', ref => ref.where('id_locataire', '==', user.uid)).valueChanges({idField: 'id'})
          .subscribe((locations: any) => {
            this.mesLocations = locations;
          });
        this.firestore.collection('LOUER', ref => ref.where('id_loueur', '==', user.uid)).valueChanges({idField: 'id'})
          .subscribe((locations: any) => {
            this.locations = locations;
          });

      }})
  }
  validerLocation(idLocation:string, idLouer:string) {
    console.log(idLouer)
    console.log(idLocation)
    this.firestore.collection('LOUER').doc(idLouer).delete();
    const locationRef = this.firestore.collection('LOCATIONS').doc(idLocation);
    locationRef.update({ disponible: true });
  }

}
