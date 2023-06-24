import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message: any; // Variable pour stocker le message
  userId!: string; // Variable pour stocker l'ID de l'utilisateur connecté

  constructor(
    private db: AngularFirestore, // Injection du service AngularFirestore pour accéder à Firestore
    private route: ActivatedRoute,
    private router: Router,
    private auth: AngularFireAuth // Injection du service AngularFireAuth pour gérer l'authentification
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid; // Récupération de l'ID de l'utilisateur connecté
      }
    });
  }

  sendMessage() {
    if (!this.message) {
      return; // Si le message est vide, la fonction s'arrête
    }

    const date = new Date();
    const timestamp = date.getTime(); // Obtenir le timestamp actuel

    const idLocation = this.route.snapshot.paramMap.get('id') ?? 'default'; // Récupération de l'ID de la location à partir des paramètres de l'URL
    console.log(idLocation);

    this.db
      .collection('LOCATIONS')
      .doc<any>(idLocation)
      .valueChanges()
      .subscribe(location => {
        // Récupération des informations de la location à partir de Firestore

        const newMessage = {
          idJeu: this.route.snapshot.paramMap.get('id'), // ID du jeu (paramètre de l'URL)
          idClient: this.userId, // ID du client (utilisateur connecté)
          idLoueur: location.idLoueur, // ID du loueur (récupéré à partir des informations de la location)
          dateHeureMinuteSeconde: timestamp, // Timestamp du message
          Message: this.message, // Contenu du message
          nomJeu: location.nom, // Nom du jeu (récupéré à partir des informations de la location)
          idSend: this.userId // ID de l'expéditeur (utilisateur connecté)
        };

        try {
          this.db.collection('CONVERSATIONS').add(newMessage); // Ajout du nouveau message à la collection 'CONVERSATIONS' dans Firestore
          this.message = ''; // Réinitialisation du contenu du message
          this.router.navigate(['/locations']); // Redirection vers la page '/locations'
        } catch (e) {
          console.log('erreur');
        }
      });
  }
}
