import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-locations-admin',
  templateUrl: './list-locations-admin.component.html',
  styleUrls: ['./list-locations-admin.component.scss']
})
export class ListLocationsAdminComponent implements OnInit {
  locationsAll: any; // Variable pour stocker toutes les locations

  constructor(
    private db: AngularFirestore, // Injection du service AngularFirestore pour accéder à Firestore
    private router: Router,
    private afAuth: AngularFireAuth // Injection du service AngularFireAuth pour gérer l'authentification
  ) {}

  ngOnInit(): void {
    this.getLocations(); // Appel de la méthode pour récupérer les locations
  }

  getLocations() {
    const user = this.afAuth.authState.subscribe(user => {
      if (user) {
        // Vérifier si l'utilisateur est connecté

        this.db
          .collection('LOCATIONS')
          .valueChanges({ idField: 'id' })
          .subscribe((locations: any) => {
            this.locationsAll = locations; // Récupérer toutes les locations à partir de la collection 'LOCATIONS' dans Firestore
            console.log(locations);
          });
      } else {
        this.locationsAll = []; // Si l'utilisateur n'est pas connecté, le tableau des locations est vide
      }
    });
  }

  deleteLocation(locationId: string) {
    this.db.collection('LOCATIONS').doc(locationId).delete(); // Supprimer la location correspondante dans Firestore en utilisant son ID
  }
}
