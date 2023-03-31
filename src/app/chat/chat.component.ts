import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {doc} from "@angular/fire/firestore";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  message: any
  loc:any
  locationsCollection!:any
  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    const date = new Date();
    const timestamp = date.getTime();
    const idLocation:any = this.route.snapshot.paramMap.get('idLocation');
    this.db.collection('LOCATIONS').get(idLocation).toPromise().then((locatio:any) => {
      if (locatio.exists) {
        const location = locatio.data();
        console.log(location);
      } else {
        console.log("Le document n'existe pas !");
      }
    }).catch(error => {
      console.log("Erreur lors de la récupération de l'objet :", error);
    });
    console.log(this.loc)
    const newMessage = {
      idJeu: this.route.snapshot.paramMap.get('id'),
      idClient: this.route.snapshot.paramMap.get('id'),
      idLoueur: this.loc.idLoueur,
      dateHeureMinuteSeconde: timestamp,
      Message: this.message,
      nomJeu: this.loc.nom
    };
    this.db.collection('CONVERSATIONS').add(newMessage);
    this.message = '';
  }
}
