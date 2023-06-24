import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import des classes FormControl, FormGroup et Validators depuis Angular Forms
import { Router } from '@angular/router';

@Component({
  selector: 'app-fromulaire',
  templateUrl: './fromulaire.component.html',
  styleUrls: ['./fromulaire.component.scss']
})
export class FromulaireComponent {
  formulaire: FormGroup; // Formulaire réactif pour les champs de saisie

  constructor(
    private db: AngularFirestore, // Injection du service AngularFirestore pour accéder à Firestore
    private router: Router,
    private afAuth: AngularFireAuth // Injection du service AngularFireAuth pour gérer l'authentification
  ) {
    this.formulaire = new FormGroup({
      // Création du formulaire réactif avec les champs de saisie et les validateurs
      nom: new FormControl('', Validators.required), // Champ 'nom' avec validation requise
      description: new FormControl('', Validators.required), // Champ 'description' avec validation requise
      localisation: new FormControl('', Validators.required), // Champ 'localisation' avec validation requise
      prix: new FormControl('', Validators.required), // Champ 'prix' avec validation requise
      photo: new FormControl('', Validators.required), // Champ 'photo' avec validation requise
      idLoueur: new FormControl('') // Champ 'idLoueur' sans validation requise
    });
  }

  createProduct() {
    if (this.formulaire.valid) {
      // Vérifier si le formulaire est valide
      const user = this.afAuth.authState.subscribe(user => {
        if (user) {
          // Vérifier si l'utilisateur est connecté

          const location = {
            // Création de l'objet location avec les valeurs du formulaire
            nom: this.formulaire.value.nom,
            description: this.formulaire.value.description,
            localisation: this.formulaire.value.localisation,
            photo: this.formulaire.value.photo,
            disponible: true,
            prix: this.formulaire.value.prix,
            idLoueur: user.uid // Utiliser l'ID de l'utilisateur connecté comme ID du loueur
          };

          this.db.collection('LOCATIONS').add(location); // Ajouter la location à la collection 'LOCATIONS' dans Firestore
          this.formulaire.reset(); // Réinitialiser le formulaire
          this.router.navigate(['/locations']); // Redirection vers la page '/locations'
        }
      });
    }
  }
}
