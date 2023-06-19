import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  idUser: any

  constructor(private db: AngularFirestore, private route: ActivatedRoute,private router: Router,private auth: AngularFireAuth) {
  }
  ngOnInit() {
  }
  addAdmin() {
      const newUser = {
        idUser:this.idUser
      };
      try{
        this.db.collection('USERS').add(newUser);
        this.idUser = '';
        this.goBack()
      }catch (e){
        console.log("erreur")
      }
    };
  goBack() {
    window.history.back();
  }

}
