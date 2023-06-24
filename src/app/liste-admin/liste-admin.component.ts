import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.scss']
})
export class ListeAdminComponent implements OnInit {
  admins: any; // Variable pour stocker tous les administrateurs

  constructor(
    private db: AngularFirestore, // Injection du service AngularFirestore pour accéder à Firestore
    private router: Router,
    private afAuth: AngularFireAuth // Injection du service AngularFireAuth pour gérer l'authentification
  ) {}

  ngOnInit(): void {
    this.getAdmins(); // Appel de la méthode pour récupérer les administrateurs
  }

  getAdmins() {
    const user = this.afAuth.authState.subscribe(user => {
      if (user) {
        // Vérifier si l'utilisateur est connecté

        this.db
          .collection('USERS')
          .valueChanges({ idField: 'id' })
          .subscribe((admins: any[]) => {
            this.admins = admins; // Récupérer tous les administrateurs à partir de la collection 'USERS' dans Firestore
            console.log(this.admins);
          });
      } else {
        this.admins = []; // Si l'utilisateur n'est pas connecté, le tableau des administrateurs est vide
      }
    });
  }

  deleteAdmin(adminId: string) {
    this.db.collection('USERS').doc(adminId).delete(); // Supprimer l'administrateur correspondant dans Firestore en utilisant son ID
  }
}
