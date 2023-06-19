import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs/operators';

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

  userId!: string;
  isAdminList: any[] = [];
  isAdmin: boolean = false;
  locationsCollection: AngularFirestoreCollection<Location>;
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  searchQuery: string = '';
  sortOption: string = '';

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.locationsCollection = afs.collection<Location>('LOCATIONS');
  }

  async ngOnInit() {
    const id = await this.returnIdUser();
    await this.checkIdExists(id);
    this.verifIsAdmin();
    this.loadLocations();
  }

  async louerLocation(locationId: string, loueurId: string, jeuName: string, prix: string) {
    const user = await this.auth.authState.pipe(take(1)).toPromise();
    if (user) {
      const louerDoc = this.afs.collection('LOUER').doc();
      louerDoc.set({ id_locataire: user.uid, id_jeu: locationId, id_loueur: loueurId, jeuName: jeuName, prix: prix });
      const locationDoc = this.locationsCollection.doc(locationId);
      locationDoc.update({ disponible: false });
    }
  }

  async returnIdUser() {
    const user = await this.auth.authState.pipe(take(1)).toPromise();
    if (user) {
      return user.uid;
    }
    return '';
  }

  async checkIdExists(id: string) {
    const querySnapshot = await this.afs.collection('USERS', ref => ref.where('idUser', '==', id)).get().toPromise();
    if (querySnapshot) {
      this.isAdminList = querySnapshot.docs.map(doc => doc.data());
    } else {
      this.isAdminList = [];
    }
  }

  verifIsAdmin() {
    this.isAdmin = this.isAdminList.length > 0;
  }

  loadLocations() {
    this.locationsCollection.valueChanges({ idField: 'id' }).subscribe(locations => {
      this.locations = locations;
      this.filterLocations();
      this.sortLocations();
    });
  }

  filterLocations() {
    this.filteredLocations = this.locations.filter(location => {
      const query = this.searchQuery.toLowerCase();
      return location.nom.toLowerCase().includes(query)
        || location.localisation.toLowerCase().includes(query)
        || location.description.toLowerCase().includes(query);
    });
    this.sortLocations();
  }

  sortLocations() {
    switch (this.sortOption) {
      case 'az':
        this.filteredLocations.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'za':
        this.filteredLocations.sort((a, b) => b.nom.localeCompare(a.nom));
        break;
      case 'price_asc':
        this.filteredLocations.sort((a, b) => +a.prix - +b.prix);
        break;
      case 'price_desc':
        this.filteredLocations.sort((a, b) => +b.prix - +a.prix);
        break;
      default:
        // Pas de tri
        break;
    }
  }

}
