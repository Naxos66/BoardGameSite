import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Location} from "@angular/common";

@Component({
  selector: 'app-list-locations-admin',
  templateUrl: './list-locations-admin.component.html',
  styleUrls: ['./list-locations-admin.component.scss']
})
export class ListLocationsAdminComponent implements OnInit {
  locationsAll:any
  constructor(private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getLocations()
  }
  getLocations() {
    const user = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.db.collection('LOCATIONS').valueChanges({idField: 'id'})
          .subscribe((locations:any) => {
            this.locationsAll = locations;
            console.log(locations)
          });
      } else {
        this.locationsAll = [];
      }
    });
  }

  deleteLocation(locationId: string) {
    this.db.collection('LOCATIONS').doc(locationId).delete();
  }

}
