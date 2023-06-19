import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.scss']
})
export class ListeAdminComponent implements OnInit {

  admins:any
  constructor(private db: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.getAdmins()
  }

  getAdmins() {
    const user = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.db.collection('USERS').valueChanges({ idField: 'id' })
          .subscribe((admins: any[]) => {
            this.admins = admins;
            console.log(this.admins);
          });
      } else {
        this.admins = [];
      }
    });
  }


  deleteAdmin(adminId: string) {
    this.db.collection('USERS').doc(adminId).delete();
  }

}
