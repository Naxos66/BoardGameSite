import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  idUser: any; // Variable pour stocker l'ID de l'utilisateur

  constructor(
    private db: AngularFirestore, // Injection du service AngularFirestore pour accéder à Firestore
  ) {}

  ngOnInit() {
    // Méthode appelée lors de l'initialisation du composant
  }

  addAdmin() {
    const newUser = {
      idUser: this.idUser
    }; // Création d'un nouvel utilisateur avec l'ID spécifié

    try {
      this.db.collection('USERS').add(newUser); // Ajout du nouvel utilisateur à la collection 'USERS' dans Firestore
      this.idUser = ''; // Réinitialisation de l'ID de l'utilisateur
      this.goBack(); // Appel de la méthode goBack pour revenir en arrière
    } catch (e) {
      console.log('erreur');
    }
  }

  goBack() {
    window.history.back(); // Méthode pour revenir à la page précédente
  }
}
