import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth

@Component({
  selector: 'app-list-locations-encours-admin',
  templateUrl: './list-locations-encours-admin.component.html',
  styleUrls: ['./list-locations-encours-admin.component.scss']
})
export class ListLocationsEncoursAdminComponent implements OnInit {
  AllLocations: any[] = []; // Tableau pour stocker toutes les locations en cours

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    const user = this.afAuth.authState.subscribe(user => {
      if (user) {
        // Vérifier si l'utilisateur est connecté

        this.firestore
          .collection('LOUER')
          .valueChanges({ idField: 'id' })
          .subscribe((locations: any) => {
            this.AllLocations = locations; // Récupérer toutes les locations en cours à partir de la collection 'LOUER' dans Firestore
          });
      }
    });
  }

  validerLocation(idLocation: string, idLouer: string) {
    this.firestore.collection('LOUER').doc(idLouer).delete(); // Supprimer la location en cours correspondante dans Firestore en utilisant son ID dans la collection 'LOUER'
    const locationRef = this.firestore.collection('LOCATIONS').doc(idLocation);
    locationRef.update({ disponible: true }); // Mettre à jour la disponibilité de la location correspondante dans la collection 'LOCATIONS' dans Firestore
  }
}
