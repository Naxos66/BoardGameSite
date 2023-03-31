import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-liste-chat',
  templateUrl: './liste-chat.component.html',
  styleUrls: ['./liste-chat.component.scss']
})
export class ListeChatComponent implements OnInit {
  userId!: string;
  conversations: any[] = [];

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
  }

  ngOnInit(): void {
    console.log("test")
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.afs.collection('CONVERSATIONS', ref => ref.where('idClient', '==', this.userId).where('idLoueur', '==', this.userId)).valueChanges().subscribe(conversations => {
          this.conversations = conversations;
          console.log(conversations)  });
      }
    });
  }

}
