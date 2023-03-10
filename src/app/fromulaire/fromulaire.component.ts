import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-fromulaire',
  templateUrl: './fromulaire.component.html',
  styleUrls: ['./fromulaire.component.scss']
})
export class FromulaireComponent {
    nom: string = "";
    description: string = "";
    prix: string = "";
    photo: string = "";
    disponible: boolean = true;
    message: string = "";

  constructor(private db: AngularFirestore) {}

  createProduct(){
    const location = {
      nom : this.nom,
      description: this.description,
      photo: this.photo,
      disponible: this.disponible,
      prix: this.prix
    };
    this.db.collection('LOCATIONS').add(location);
    this.message = 'Ajout avec Succès';
  }
}

