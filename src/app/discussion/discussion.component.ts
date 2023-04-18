import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';

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
  
  messages: string[] = [];
  message: string = '';
  socket: any;
  idClient: any;
  idJeu:any;
  idLoueur:any;
  messagess: Message[] = [
    { author: 'John', content: 'Hello!' },
    { author: 'Jane', content: 'Hi there!' },
    { author: 'John', content: 'How are you doing?' },
    { author: 'Jane', content: 'I\'m doing well, thanks.' },
    { author: 'John', content: 'That\'s great to hear.' },
    { author: 'Jane', content: 'How about you?' },
    { author: 'John', content: 'I\'m doing pretty good.' },
    { author: 'Jane', content: 'That\'s good to hear.' },
  ];
  
  constructor(private route: ActivatedRoute, private db: AngularFirestore, private router: Router) 
  {
  }

  ngOnInit(): void {
    this.idClient = this.route.snapshot.paramMap.get('idClient');
    this.idJeu = this.route.snapshot.paramMap.get('idJeu');
    this.idLoueur = this.route.snapshot.paramMap.get('idLoueur');
    this.messages = this.messagess.map((message) => message.content);
    console.log('idClient', this.idClient);
    console.log('idJeu', this.idJeu);
    console.log('idLoueur', this.idLoueur);
  }
  

  envoyerMessage(): void {
    if (!this.message) {
      return;
    }
    const date = new Date();
    const timestamp = date.getTime();
    // const idLocation:any = this.route.snapshot.paramMap.get('idLocation');
    // console.log(idLocation)
    const idLocation = this.route.snapshot.paramMap.get('id') ?? 'default';
    console.log(idLocation)
    this.db.collection('LOCATIONS').doc<any>(idLocation).valueChanges().subscribe(location => {
      const newMessage = {
        idJeu: this.idJeu,
        idClient: this.idClient,
        idLoueur: this.idLoueur,
        dateHeureMinuteSeconde: timestamp,
        Message: this.message,
        nomJeu: location.nom,
      };
      try{
        this.db.collection('CONVERSATIONS').add(newMessage);
        this.message = '';
        this.router.navigate(['/locations']);
      }catch (e){
        console.log("erreur")
      }
    });
  }
  

}
