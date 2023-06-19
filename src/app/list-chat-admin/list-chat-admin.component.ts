// import {Component, OnInit} from '@angular/core';
// import {AngularFirestore} from "@angular/fire/compat/firestore";
// import {AngularFireAuth} from "@angular/fire/compat/auth";
//
// @Component({
//   selector: 'app-list-chat-admin',
//   templateUrl: './list-chat-admin.component.html',
//   styleUrls: ['./list-chat-admin.component.scss']
// })
// export class ListChatAdminComponent implements OnInit {
//   conversations: any[] = [];
//   conversationsTri: any[] = [];
//
//   constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
//   }
//
//   ngOnInit(): void {
//     this.auth.authState.subscribe(user => {
//
//       this.afs.collection('CONVERSATIONS').valueChanges().subscribe(conversations => {
//         this.conversations = conversations;
//       });
//
//       this.conversations.forEach(conversation => {
//         if (!this.conversationsTri.find(c => c.idJeu === conversation.idJeu)) {
//           this.conversationsTri.push(conversation);
//           console.log(conversation)
//         }
//       });
//     });
//   };
// }
