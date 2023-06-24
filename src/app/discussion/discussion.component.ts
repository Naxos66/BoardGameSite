import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth

interface Message {
  author: string;
  content: string;
}

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  messages: any[] = []; // Tableau pour stocker les messages de la conversation
  isMe: boolean = false; // Variable pour indiquer si l'utilisateur connecté est le loueur ou non
  message: string = ''; // Variable pour stocker le contenu du message
  userId!: string; // Variable pour stocker l'ID de l'utilisateur connecté
  socket: any;
  idClient: any;
  idJeu: any;
  idLoueur: any;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore, // Injection du service AngularFirestore pour accéder à Firestore
    private router: Router,
    private afs: AngularFirestore,
    private auth: AngularFireAuth // Injection du service AngularFireAuth pour gérer l'authentification
  ) {}

  ngOnInit(): void {
    this.idClient = this.route.snapshot.paramMap.get('idClient');
    this.idJeu = this.route.snapshot.paramMap.get('idJeu');
    this.idLoueur = this.route.snapshot.paramMap.get('idLoueur');

    this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid; // Récupération de l'ID de l'utilisateur connecté
      }
    });

    if (this.idLoueur == this.userId) {
      this.isMe = true; // Vérification si l'utilisateur connecté est le loueur
    }

    console.log('idClient', this.idClient);
    console.log('idJeu', this.idJeu);
    console.log('idLoueur', this.idLoueur);

    this.afs
      .collection('CONVERSATIONS', ref =>
        ref
          .where('idClient', '==', this.idClient)
          .where('idLoueur', '==', this.idLoueur)
          .where('idJeu', '==', this.idJeu)
          .orderBy('dateHeureMinuteSeconde', 'asc')
      )
      .valueChanges({ idField: 'id' })
      .subscribe(conversations => {
        this.messages = conversations; // Récupération des messages de la conversation à partir de Firestore
      });
  }

  trackById(index: number, message: any) {
    return message.id; // Fonction utilisée pour suivre les messages par leur ID lors de l'affichage
  }

  envoyerMessage(): void {
    if (!this.message) {
      return; // Si le message est vide, la fonction s'arrête
    }

    const date = new Date();
    const timestamp = date.getTime(); // Obtenir le timestamp actuel

    this.db
      .collection('LOCATIONS')
      .doc<any>(this.idJeu)
      .valueChanges({ idField: 'id' })
      .subscribe(location => {
        // Récupération des informations de la location à partir de Firestore

        const newMessage = {
          idJeu: this.idJeu,
          idClient: this.idClient,
          idLoueur: this.idLoueur,
          dateHeureMinuteSeconde: timestamp,
          Message: this.message,
          nomJeu: location.nom,
          idSend: this.userId
        };

        try {
          this.db.collection('CONVERSATIONS').add(newMessage); // Ajout du nouveau message à la collection 'CONVERSATIONS' dans Firestore
          this.message = ''; // Réinitialisation du contenu du message
          this.ngOnInit(); // Recharger les messages de la conversation
        } catch (e) {
          console.log('erreur');
        }
      });
  }
}
