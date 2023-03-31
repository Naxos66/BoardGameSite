import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {doc} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  message: any
  userId!: string ;

  constructor(private db: AngularFirestore, private route: ActivatedRoute,private router: Router,private auth: AngularFireAuth) {
  }
ngOnInit() {
  this.auth.authState.subscribe(user => {if (user) {this.userId= user.uid;}});
}

  sendMessage() {
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
        idJeu: this.route.snapshot.paramMap.get('id'),
        idClient: this.userId,
        idLoueur: location.idLoueur,
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
