import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-locations',
  templateUrl: './liste-locations.component.html',
  styleUrls: ['./liste-locations.component.scss']
})
export class ListeLocationsComponent implements OnInit {
  locations: any; // Variable pour stocker les locations

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
          .collection('LOCATIONS', ref => ref.where('idLoueur', '==', user.uid))
          .valueChanges({ idField: 'id' })
          .subscribe((locations: any) => {
            this.locations = locations; // Récupérer les locations du loueur connecté à partir de la collection 'LOCATIONS' dans Firestore
          });
      } else {
        this.locations = []; // Si l'utilisateur n'est pas connecté, le tableau des locations est vide
      }
    });
  }

  deleteLocation(locationId: string) {
    this.db.collection('LOCATIONS').doc(locationId).delete(); // Supprimer la location correspondante dans Firestore en utilisant son ID
  }
}
