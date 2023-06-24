import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth

@Component({
  selector: 'app-liste-chat',
  templateUrl: './liste-chat.component.html',
  styleUrls: ['./liste-chat.component.scss']
})
export class ListeChatComponent implements OnInit {
  userId!: string; // Variable pour stocker l'ID de l'utilisateur connecté
  conversations: any[] = []; // Tableau pour stocker toutes les conversations
  conversationsTri: any[] = []; // Tableau pour stocker les conversations triées

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid; // Récupération de l'ID de l'utilisateur connecté
        console.log(this.userId);

        this.afs
          .collection('CONVERSATIONS', ref =>
            ref.where('idClient', '==', this.userId)
          )
          .valueChanges()
          .subscribe(conversations => {
            this.conversations = conversations; // Récupération des conversations où l'utilisateur est le client
          });

        this.afs
          .collection('CONVERSATIONS', ref =>
            ref.where('idLoueur', '==', this.userId)
          )
          .valueChanges()
          .subscribe(conversations => {
            this.conversations.push(...conversations); // Ajout des conversations où l'utilisateur est le loueur au tableau
            this.conversations.forEach(conversation => {
              if (!this.conversationsTri.find(c => c.idJeu === conversation.idJeu)) {
                this.conversationsTri.push(conversation); // Tri et stockage des conversations uniques par ID de jeu
              }
            });
          });
      }
    });
  }
}
