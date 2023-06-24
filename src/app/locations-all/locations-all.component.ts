import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Import du service AngularFireDatabase
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth

@Component({
  selector: 'app-locations-all',
  templateUrl: './locations-all.component.html',
  styleUrls: ['./locations-all.component.scss']
})
export class LocationsAllComponent implements OnInit {
  mesLocations: any[] = []; // Tableau pour stocker les locations louées par l'utilisateur
  locations: any[] = []; // Tableau pour stocker toutes les locations

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    const user = this.afAuth.authState.subscribe(user => {
      if (user) {
        // Vérifier si l'utilisateur est connecté

        this.firestore
          .collection('LOUER', ref => ref.where('id_locataire', '==', user.uid))
          .valueChanges({ idField: 'id' })
          .subscribe((locations: any) => {
            this.mesLocations = locations; // Récupérer les locations louées par l'utilisateur connecté à partir de la collection 'LOUER' dans Firestore
          });

        this.firestore
          .collection('LOUER', ref => ref.where('id_loueur', '==', user.uid))
          .valueChanges({ idField: 'id' })
          .subscribe((locations: any) => {
            this.locations = locations; // Récupérer toutes les locations où l'utilisateur connecté est le loueur à partir de la collection 'LOUER' dans Firestore
          });
      }
    });
  }

  validerLocation(idLocation: string, idLouer: string) {
    console.log(idLouer);
    console.log(idLocation);
    this.firestore.collection('LOUER').doc(idLouer).delete(); // Supprimer la location de la collection 'LOUER' dans Firestore en utilisant son ID
    const locationRef = this.firestore.collection('LOCATIONS').doc(idLocation); // Référence à la location dans la collection 'LOCATIONS' dans Firestore
    locationRef.update({ disponible: true }); // Mettre à jour la disponibilité de la location
  }
}
