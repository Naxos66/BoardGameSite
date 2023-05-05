import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {io} from 'socket.io-client';
import {AngularFireAuth} from "@angular/fire/compat/auth";

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

  messages: any[] = [];

  isMe: boolean = false;
  message: string = '';
  userId!: string;
  socket: any;
  idClient: any;
  idJeu: any;
  idLoueur: any;


  constructor(private route: ActivatedRoute, private db: AngularFirestore, private router: Router, private afs: AngularFirestore, private auth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.idClient = this.route.snapshot.paramMap.get('idClient');
    this.idJeu = this.route.snapshot.paramMap.get('idJeu');
    this.idLoueur = this.route.snapshot.paramMap.get('idLoueur');
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
    if (this.idLoueur == this.userId) {
      this.isMe = true;
    }
    // this.messages = this.messagess.map((message) => message.content);
    console.log('idClient', this.idClient);
    console.log('idJeu', this.idJeu);
    console.log('idLoueur', this.idLoueur);
    this.afs.collection('CONVERSATIONS', ref => ref
      .where('idClient', '==', this.idClient).where('idLoueur', '==', this.idLoueur).where('idJeu', '==', this.idJeu).orderBy('dateHeureMinuteSeconde',"asc")
    ).valueChanges({idField: 'id'}).subscribe(conversations => {
      this.messages = conversations;
    });
  }

trackById(index:number, message:any){
    return message.id
}

  envoyerMessage(): void {
    if (!this.message) {
      return;
    }
    const date = new Date();
    const timestamp = date.getTime();
    this.db.collection('LOCATIONS').doc<any>(this.idJeu).valueChanges({idField: 'id'}).subscribe(location => {
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
        this.db.collection('CONVERSATIONS').add(newMessage);
        this.message = '';
        this.ngOnInit()
      } catch (e) {
        console.log("erreur")
      }
    });
  }


}
