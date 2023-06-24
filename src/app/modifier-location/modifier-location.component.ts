import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import du FormBuilder, FormGroup et Validators pour la gestion du formulaire
import { ActivatedRoute, Router } from '@angular/router'; // Import des services ActivatedRoute et Router pour la gestion des routes
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Import du service AngularFireDatabase
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore

@Component({
  selector: 'app-modifier-location',
  templateUrl: './modifier-location.component.html',
  styleUrls: ['./modifier-location.component.scss']
})
export class ModifierLocationComponent implements OnInit {
  locationForm!: FormGroup; // Formulaire de modification de la location
  locationId!: any; // ID de la location
  location!: Location; // Objet Location

  constructor(
    private fb: FormBuilder, // Injection du FormBuilder pour la gestion des formulaires
    private route: ActivatedRoute, // Injection du service ActivatedRoute pour récupérer les paramètres de l'URL
    private db: AngularFirestore, // Injection du service AngularFirestore pour accéder à Firestore
    private router: Router // Injection du service Router pour la gestion des routes
  ) {}

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID de la location à partir des paramètres de l'URL
    this.initForm(); // Initialisation du formulaire de modification
    if (this.locationId) {
      // Vérification si l'ID de la location est défini
      this.db
        .collection('LOCATIONS')
        .doc<any>(this.locationId)
        .valueChanges()
        .subscribe(location => {
          if (location) {
            this.location = location; // Récupération de la location à partir de la collection 'LOCATIONS' dans Firestore
            this.locationForm.patchValue(this.location); // Remplissage du formulaire avec les données de la location
          }
        });
    }
  }

  initForm(): void {
    this.locationForm = this.fb.group({
      nom: ['', Validators.required], // Champ nom avec validation requise
      description: ['', Validators.required], // Champ description avec validation requise
      localisation: ['', Validators.required], // Champ localisation avec validation requise
      prix: ['', Validators.required], // Champ prix avec validation requise
      photo: ['', Validators.required] // Champ photo avec validation requise
    });
  }

  updateLocation(): void {
    const updatedLocation: Location = this.locationForm.value; // Récupération des valeurs du formulaire
    this.db.collection('LOCATIONS').doc(this.locationId).update(updatedLocation); // Mise à jour de la location dans la collection 'LOCATIONS' dans Firestore
    this.goBack(); // Redirection vers la page précédente
  }

  resetForm(): void {
    if (this.location) {
      this.locationForm.patchValue(this.location); // Remplissage du formulaire avec les données de la location
    } else {
      this.locationForm.reset(); // Réinitialisation du formulaire
    }
  }

  goBack() {
    window.history.back(); // Redirection vers la page précédente en utilisant la méthode goBack() de l'objet window
  }
}
