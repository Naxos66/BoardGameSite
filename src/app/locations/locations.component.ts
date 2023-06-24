import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'; // Import du service AngularFirestore et AngularFirestoreCollection
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import du service AngularFireAuth
import { take } from 'rxjs/operators'; // Import de l'opérateur take pour limiter le nombre d'éléments émis

interface Location {
  prix: string;
  nom: string;
  localisation: string;
  description: string;
  disponible: boolean;
  photo: string;
  id: string;
  idLoueur: string;
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  userId!: string; // Variable pour stocker l'ID de l'utilisateur connecté
  isAdminList: any[] = []; // Tableau pour stocker la liste des administrateurs
  isAdmin: boolean = false; // Variable pour vérifier si l'utilisateur est un administrateur
  locationsCollection: AngularFirestoreCollection<Location>; // Collection Firestore pour les locations
  locations: Location[] = []; // Tableau pour stocker toutes les locations
  filteredLocations: Location[] = []; // Tableau pour stocker les locations filtrées
  searchQuery: string = ''; // Variable pour stocker la requête de recherche
  sortOption: string = ''; // Variable pour stocker l'option de tri

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.locationsCollection = afs.collection<Location>('LOCATIONS'); // Collection Firestore pour la collection 'LOCATIONS'
  }

  async ngOnInit() {
    const id = await this.returnIdUser(); // Récupération de l'ID de l'utilisateur connecté
    await this.checkIdExists(id); // Vérification si l'ID existe dans la collection 'USERS'
    this.verifIsAdmin(); // Vérification si l'utilisateur est un administrateur
    this.loadLocations(); // Chargement des locations
  }

  async louerLocation(locationId: string, loueurId: string, jeuName: string, prix: string) {
    const user = await this.auth.authState.pipe(take(1)).toPromise(); // Récupération de l'utilisateur connecté
    if (user) {
      const louerDoc = this.afs.collection('LOUER').doc(); // Référence au document 'LOUER'
      louerDoc.set({ id_locataire: user.uid, id_jeu: locationId, id_loueur: loueurId, jeuName: jeuName, prix: prix }); // Ajout de la location dans la collection 'LOUER'
      const locationDoc = this.locationsCollection.doc(locationId); // Référence à la location dans la collection 'LOCATIONS'
      locationDoc.update({ disponible: false }); // Mise à jour de la disponibilité de la location
    }
  }

  async returnIdUser() {
    const user = await this.auth.authState.pipe(take(1)).toPromise(); // Récupération de l'utilisateur connecté
    if (user) {
      return user.uid; // Renvoie de l'ID de l'utilisateur
    }
    return ''; // Renvoie une chaîne vide si l'utilisateur n'est pas connecté
  }

  async checkIdExists(id: string) {
    const querySnapshot = await this.afs.collection('USERS', ref => ref.where('idUser', '==', id)).get().toPromise(); // Vérification si l'ID existe dans la collection 'USERS'
    if (querySnapshot) {
      this.isAdminList = querySnapshot.docs.map(doc => doc.data()); // Récupération des données des administrateurs
    } else {
      this.isAdminList = []; // Si l'ID n'existe pas, le tableau des administrateurs est vide
    }
  }

  verifIsAdmin() {
    this.isAdmin = this.isAdminList.length > 0; // Vérification si l'utilisateur est un administrateur
  }

  loadLocations() {
    this.locationsCollection.valueChanges({ idField: 'id' }).subscribe(locations => {
      this.locations = locations; // Récupération de toutes les locations à partir de la collection 'LOCATIONS'
      this.filterLocations(); // Filtrage des locations
      this.sortLocations(); // Tri des locations
    });
  }

  filterLocations() {
    this.filteredLocations = this.locations.filter(location => {
      const query = this.searchQuery.toLowerCase();
      return (
        location.nom.toLowerCase().includes(query) ||
        location.localisation.toLowerCase().includes(query) ||
        location.description.toLowerCase().includes(query)
      );
    });
    this.sortLocations(); // Tri des locations après le filtrage
  }

  sortLocations() {
    switch (this.sortOption) {
      case 'az':
        this.filteredLocations.sort((a, b) => a.nom.localeCompare(b.nom)); // Tri par ordre alphabétique ascendant (A à Z)
        break;
      case 'za':
        this.filteredLocations.sort((a, b) => b.nom.localeCompare(a.nom)); // Tri par ordre alphabétique descendant (Z à A)
        break;
      case 'price_asc':
        this.filteredLocations.sort((a, b) => +a.prix - +b.prix); // Tri par prix ascendant
        break;
      case 'price_desc':
        this.filteredLocations.sort((a, b) => +b.prix - +a.prix); // Tri par prix descendant
        break;
      default:
        // Pas de tri
        break;
    }
  }

}
