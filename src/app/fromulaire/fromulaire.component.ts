import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-fromulaire',
  templateUrl: './fromulaire.component.html',
  styleUrls: ['./fromulaire.component.scss']
})
export class FromulaireComponent {
  formulaire: FormGroup;


  constructor(private db: AngularFirestore, private router: Router) {
    this.formulaire = new FormGroup({
      nom: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      prix: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      idLoueur: new FormControl('')
    });
  }

  createProduct() {
    if (this.formulaire.valid) {
    const location = {
      nom: this.formulaire.value.nom,
      description: this.formulaire.value.description,
      photo: this.formulaire.value.photo,
      disponible: true,
      prix: this.formulaire.value.prix,
      idLoueur:"1"
    };
    this.db.collection('LOCATIONS').add(location);
    this.formulaire.reset();
    this.router.navigate(['/locations']);
  }
  }
}
