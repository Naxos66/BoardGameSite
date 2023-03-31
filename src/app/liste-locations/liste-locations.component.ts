import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-locations',
  templateUrl: './liste-locations.component.html',
  styleUrls: ['./liste-locations.component.scss']
})
export class ListeLocationsComponent implements OnInit {
  locations:any
  constructor(private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.getLocations()
  }

  getLocations() {
    const user = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.db.collection('LOCATIONS', ref => ref.where('idLoueur', '==', user.uid)).valueChanges({idField: 'id'})
          .subscribe((locations:any) => {
            this.locations = locations;
          });
      } else {
        this.locations = [];
      }
    });
  }

  deleteLocation(locationId: string) {
    this.db.collection('LOCATIONS').doc(locationId).delete();
  }

}

